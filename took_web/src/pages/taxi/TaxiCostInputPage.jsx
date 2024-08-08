import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import taxiIcon from '../../assets/payment/taxiTook.png';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { formatNumber } from '../../utils/format';
import { formatDate } from '../../utils/formatDate';

// todo: 실제 데이터 받아서 연동
// 임시 데이터
const tempTaxi = {
  taxi_seq: 1,
  room_seq: 1,
  user_seq: 1,
  party_seq: 1,
  start_lat: null,
  start_lng: null,
  gender: true,
  count: 3,
  max: 4,
  status: true,
  created_at: '2024-07-06T00:23:00',
  finish_time: '2024-07-06T01:23:00',
  cost: 34000,
  master: '방장',
};

const tempMember = [
  {
    member_seq: 1,
    party_seq: 1,
    user_seq: 1,
    userName: '조현정',
    imgNo: 19,
    cost: 13000,
    real_cost: 12000,
    status: true,
    receive: false,
    is_leader: true,
    created_at: '2024-07-06T00:23:00',
  },
  {
    member_seq: 2,
    party_seq: 1,
    user_seq: 2,
    userName: '정희수',
    imgNo: 20,
    cost: 8000,
    real_cost: 7500,
    status: true,
    receive: false,
    is_leader: false,
    created_at: '2024-07-06T00:23:00',
  },
  {
    member_seq: 3,
    party_seq: 1,
    user_seq: 3,
    userName: '차민주',
    imgNo: 18,
    cost: 16000,
    real_cost: 14500,
    status: true,
    receive: false,
    is_leader: false,
    created_at: '2024-07-06T00:23:00',
  },
];

const tempParty = {
  party_seq: 1,
  title: '택시',
  category: 'taxi',
  cost: 34000,
  created_at: '2024-07-06T00:23:00',
  count: 3,
  total_member: 3,
};

const tempTaxiGuest = [
  {
    guest_seq: 1,
    taxi_seq: 1,
    user_seq: 1,
    cost: 12000,
    dsti_name: '목적지1',
    dsti_lat: null,
    dsti_lng: null,
    route_rank: 1,
  },
  {
    guest_seq: 2,
    taxi_seq: 1,
    user_seq: 2,
    cost: 7500,
    dsti_name: '목적지2',
    dsti_lat: null,
    dsti_lng: null,
    route_rank: 2,
  },
  {
    guest_seq: 3,
    taxi_seq: 1,
    user_seq: 3,
    cost: 14500,
    dsti_name: '목적지3',
    dsti_lat: null,
    dsti_lng: null,
    route_rank: 3,
  },
];

function TaxiCostInputPage() {
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTotalAmount(value);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen font-[Nanum_Gothic]">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          정산하기
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-4 font-[Nanum_Gothic] h-[calc(100%-160px)] relative">
        <div className="p-5 rounded-xl shadow-lg border border-inherit h-full overflow-y-scroll pb-24">
          <div className="text-gray-500 mb-4 text-sm">
            {formatDate(tempTaxi.created_at)}
          </div>
          <div className="flex items-center mb-6">
            <img src={taxiIcon} alt="Took" className="w-14 h-14" />
            <div className="ml-4 relative">
              <div className="text-sm font-bold text-black mb-1">
                총 {tempTaxi.count}명
              </div>
              <div className="text-lg flex items-center">
                <input
                  type="text"
                  placeholder="금액입력"
                  value={totalAmount ? `${formatNumber(totalAmount)}` : ''}
                  onChange={handleInputChange}
                  className="border-b border-gray-300 outline-none text-lg text-black w-28"
                />
                <span className="text-lg font-bold text-black ml-1">원</span>
              </div>
            </div>
          </div>

          {tempMember.map((member) => {
            const balance = member.cost - member.real_cost;
            const formattedBalance =
              balance > 0 ? `+${formatNumber(balance)}` : formatNumber(balance);
            return (
              <div key={member.member_seq} className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="flex-grow items-center">
                    <div className="flex items-center font-bold">
                      <img
                        src={getProfileImagePath(member.imgNo)}
                        alt={member.userName}
                        className="font-[Nanum_Gothic] w-9 h-9 mr-4"
                      />
                      <span>{member.userName}</span>
                      {member.is_leader && (
                        <span className="ml-2 bg-gray-300 text-white text-xs rounded-full px-2 py-0.5">
                          본인
                        </span>
                      )}
                    </div>
                    {totalAmount ? (
                      <div>
                        <div className="flex justify-between mt-2 ml-1">
                          <span className="text-sm">선결제금액</span>
                          <span className="text-sm">
                            {formatNumber(member.cost)} 원
                          </span>
                        </div>
                        <div className="flex justify-between mt-2 ml-1">
                          <span className="text-sm">실결제금액</span>
                          <span className="text-sm font-bold">
                            {formatNumber(member.real_cost)} 원
                          </span>
                        </div>
                        <div className="flex justify-between mt-2 ml-1">
                          <span className="text-sm">차액</span>
                          <span
                            className={`text-sm font-bold ${balance > 0 ? 'text-green-500' : 'text-red-500'}`}
                          >
                            {formattedBalance} 원
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="border-b border-gray-300 my-2"></div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-4 left-0 w-full flex justify-center px-4">
          <button
            className={`w-full max-w-[280px] py-3 rounded-2xl text-white text-lg font-bold ${
              totalAmount ? 'bg-main' : 'bg-main/50'
            }`}
            onClick={() => totalAmount && navigate('/somePath')} // 실제 경로로 변경
            disabled={!totalAmount}
          >
            {totalAmount ? 'took 요청하기' : '금액을 입력해 주세요'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaxiCostInputPage;
