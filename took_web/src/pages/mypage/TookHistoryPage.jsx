import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import HistoryCard from '../../components/mypage/tookHistory/historyCard'; // historyCard 컴포넌트를 임포트
import { useUser } from '../../store/user';
import { getMyPartyListApi } from '../../apis/payment/jungsan';
const mockData = [
  // 목업 데이터
  {
    party_idx: 1,
    category: '택시',
    totalCost: 20500,
    status: '정산 진행 중',
    createdAt: '7.6 (토) 01:49',
    totalMembers: 3,
    settledMembers: 2,
  },
  {
    party_idx: 2,
    category: '배달',
    totalCost: 71600,
    status: '정산완료',
    createdAt: '6.24 (월) 18:55',
    totalMembers: 4,
    settledMembers: 4,
  },
  {
    party_idx: 3,
    category: '정산',
    totalCost: 120500,
    status: '정산완료',
    createdAt: '6.22 (토) 20:11',
    totalMembers: 5,
    settledMembers: 5,
  },
  {
    party_idx: 4,
    category: '배달',
    totalCost: 20500,
    status: '정산완료',
    createdAt: '6.15 (토) 11:49',
    totalMembers: 3,
    settledMembers: 3,
  },
];

const categoryMap = {
  1: '배달',
  2: '택시',
  3: '공구',
  4: '정산',
};
function TookHistoryPage() {
  const [party, setParty] = useState([]);
  const { seq } = useUser();
  useEffect(() => {
    const fetchPartys = async () => {
      try {
        const response = await getMyPartyListApi(seq);
        console.log(response);
        if (response) {
          const partyList = response.map((party) => ({
            party_idx: party.partySeq,
            title: party.title,
            category: categoryMap[party.category] || '기타', // category 매핑
            totalCost: party.cost,
            status: party.status ? '정산완료' : '정산 진행 중', // status 매핑
            createAt: party.createAt,
            count: party.cost,
            totalMembers: party.totalMember,
            receiveCost: party.receiveCost,
            deliveryTip: party.deliveryTip,
          }));
          setParty(partyList);
          console.log(party);
        }
      } catch (error) {
        console.error('계좌 정보를 불러오는데 실패했습니다:', error);
      }
    };
    fetchPartys();
  }, []);
  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          <span className="font-dela">took</span> 히스토리
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
      <Link to={`/tookDetails/${party.party_idx}`}>
        <div className="flex flex-col mt-4 px-4">
          {party.map((party) => (
            <HistoryCard key={party.party_idx} {...party} />
          ))}
        </div>
      </Link>
    </div>
  );
}

export default TookHistoryPage;
