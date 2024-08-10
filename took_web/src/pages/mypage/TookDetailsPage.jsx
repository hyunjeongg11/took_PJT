import React, { useEffect, useState } from 'react';
import BackButton from '../../components/common/BackButton';
import { useParams } from 'react-router-dom';
import completeIcon from '../../assets/payment/complete.png'; // 정산 완료 아이콘 경로
import incompleteIcon from '../../assets/payment/incomplete.png'; // 정산 미완료 아이콘 경로
import deliveryIcon from '../../assets/payment/deliveryTook.png'; // 배달 took 아이콘 경로
import taxiIcon from '../../assets/payment/taxiTook.png'; // 택시 took 아이콘 경로
import isMeIcon from '../../assets/payment/isMe.png'; // 본인 아이콘 경로
import { partyDetailApi } from '../../apis/payment/jungsan';
import { useUser } from '../../store/user';
import payIcon from '../../assets/payment/payTook.png';
import buyIcon from '../../assets/payment/buyTook.png';

const categoryMap = {
  1: '배달',
  2: '택시',
  3: '공구',
  4: '정산',
};
const iconMap = {
  1: deliveryIcon, // 배달 아이콘
  2: taxiIcon, // 택시 아이콘
  3: buyIcon, // 공구 아이콘
  4: payIcon, // 정산 아이콘
};

const getProfileImagePath = (imgNo) => {
  const profileImages = import.meta.glob('../../assets/profile/*.png', {
    eager: true,
  });
  return profileImages[`../../assets/profile/img${imgNo}.png`]?.default || '';
};
const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  });

  const formattedTime = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
};
function TookDetailsPage() {
  const { id } = useParams();
  const { seq } = useUser();
  const [users, setUser] = useState([]);
  const [party, setParty] = useState(null);
  useEffect(() => {
    const fetchPartys = async () => {
      try {
        const response = await partyDetailApi(id);
        if (response) {
          const party = {
            partySeq: response.partyDetailList[0].party.partySeq,
            title: response.partyDetailList[0].party.title,
            category: response.partyDetailList[0].party.category,
            cost: response.partyDetailList[0].party.cost,
            status: response.partyDetailList[0].party.status
              ? '완료'
              : '미완료',
            createdAt: response.partyDetailList[0].party.createdAt,
            count: response.partyDetailList[0].party.count,
            totalMember: response.partyDetailList[0].party.totalMember,
            receiveCost: response.partyDetailList[0].party.receiveCost,
            deliveryTip: response.partyDetailList[0].party.deliveryTip,
          };
          setParty(party);
          const partyList = response.partyDetailList.map((member) => ({
            memberSeq: member.memberSeq,
            name: member.user.userName,
            imageNo: member.user.imageNo,
            orderAmount: member.cost,
            amount: member.cost + party.deliveryTip / party.totalMember,
            status: member.leader || member.status ? '완료' : '미완료', // status 매핑
            createdAt: member.createdAt,
            fakeCost: member.fakeCost,
            restCost: member.restCost,
            deliveryTip: party.deliveryTip / party.totalMember,
            isMe: member.user.userSeq == seq ? true : false,
          }));
          setUser(partyList);
        }
      } catch (error) {
        console.error('계좌 정보를 불러오는데 실패했습니다:', error);
      }
    };
    fetchPartys();
  }, []);

  if (!party) {
    return <div>Loading...</div>; // 파티 정보가 로드되기 전까지 로딩 화면 표시
  }
  const type = categoryMap[party.category];
  const date = formatDateTime(party.createdAt);

  const renderUserDetails = (user, index) => {
    const isCompleted = user.status === '완료';
    return (
      <div key={user.name} className="mb-4">
        <div className="flex items-center mb-3">
          <img
            src={getProfileImagePath(user.imageNo)}
            alt={user.name}
            className="w-9 h-9 mr-4"
          />
          <div className="flex-grow flex justify-between items-center">
            <div className="flex items-center">
              <span>{user.name}</span>
              {user.isMe && (
                <img src={isMeIcon} alt="본인" className="ml-2 w-9.5 h-5" />
              )}
            </div>
            <div className="text-right">
              <span>{user.amount.toLocaleString()}원</span>
              <div
                className={`text-sm ${isCompleted ? 'text-gray-500' : 'text-[#DD5555]'}`}
              >
                {user.status}
              </div>
            </div>
          </div>
        </div>
        {type === '배달' || type === '공동구매' ? (
          <div className="text-sm text-gray-500 mb-2">
            <div className="flex justify-between mb-2">
              <span>주문금액</span>
              <span className="font-normal">
                {user.orderAmount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between">
              <span>배달팁</span>
              <span className="font-normal">
                {user.deliveryTip.toLocaleString()}원
              </span>
            </div>
          </div>
        ) : null}
        {index < users.length - 1 && (
          <div className="border-b border-dashed border-gray-300 my-2"></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          <span className="font-dela">took</span> 상세내역
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-4 font-bold">
        <div className="bg-[#FBFBFB] p-5 rounded-xl shadow-lg border border-inherit max-h-[550px] overflow-y-scroll">
          <div className="text-gray-500 mb-4 text-sm">{date}</div>
          <div className="flex items-center mb-4">
            <img
              src={iconMap[party.category]}
              alt="Took"
              className="w-14 h-14"
            />
            <div className="ml-4">
              <div className="text-sm text-gray-500">총 {users.length}명</div>
              <div className="text-lg font-bold">
                {users
                  .reduce((acc, user) => acc + user.amount, 0)
                  .toLocaleString()}
                원
              </div>
            </div>
            <div className="ml-auto">
              <img
                src={party.status == '미완료' ? incompleteIcon : completeIcon}
                alt="정산 상태"
                className="w-17 h-16"
              />
            </div>
          </div>

          {users.map((user, index) => renderUserDetails(user, index))}
        </div>
      </div>
    </div>
  );
}

export default TookDetailsPage;
