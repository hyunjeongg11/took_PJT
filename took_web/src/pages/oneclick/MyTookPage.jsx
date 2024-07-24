import React, { useState } from 'react';
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import HistoryCard from '../../components/mypage/tookHistory/historyCard';
import SendMoneyCard from '../../components/payment/SendMoneyCard';
import getProfileImagePath from '../../utils/getProfileImagePath';
import formatNumber from '../../utils/format';
import { formatDate } from '../../utils/formatDate';

const tempParties = [
  { 
    party_idx: 1, 
    category: "택시", 
    totalCost: 20500, 
    status: "정산 진행 중", 
    createdAt: "2024-07-06T01:49:00", 
    totalMembers: 3, 
    settledMembers: 2,
  },
  { 
    party_idx: 2, 
    category: "배달", 
    totalCost: 71600, 
    status: "정산완료", 
    createdAt: "2024-06-24T18:55:00", 
    totalMembers: 5, 
    settledMembers: 5,
  },
  { 
    party_idx: 3, 
    category: "정산", 
    totalCost: 120500, 
    status: "정산완료", 
    createdAt: "2024-06-22T20:11:00", 
    totalMembers: 6, 
    settledMembers: 6,
  },
  { 
    party_idx: 4, 
    category: "배달", 
    totalCost: 20500, 
    status: "정산완료", 
    createdAt: "2024-06-15T11:49:00", 
    totalMembers: 4, 
    settledMembers: 4,
  }
];

const tempMembers = [
  { member_seq: 1, party_seq: 1, user_seq: 1, userName: '조현정', imgNo: 1, cost: 6600, status: false, receive: false, isLeader: false, createdAt: "2024-07-06T01:49:00" },
  { member_seq: 2, party_seq: 1, user_seq: 2, userName: '김성훈', imgNo: 2, cost: 5400, status: false, receive: false, isLeader: false, createdAt: "2024-07-06T01:49:00" },
  { member_seq: 3, party_seq: 1, user_seq: 3, userName: '이민찬', imgNo: 3, cost: 5400, status: false, receive: true, isLeader: true, createdAt: "2024-07-06T01:49:00" },

  { member_seq: 1, party_seq: 2, user_seq: 1, userName: '조현정', imgNo: 1, cost: 6600, status: true, receive: false, isLeader: false, createdAt: "2024-07-06T01:49:00" },
  { member_seq: 4, party_seq: 2, user_seq: 4, userName: '공재환', imgNo: 4, cost: 18550, status: true, receive: true, isLeader: true, createdAt: "2024-06-24T18:55:00" },
  { member_seq: 5, party_seq: 2, user_seq: 5, userName: '차민주', imgNo: 5, cost: 20500, status: true, receive: true, isLeader: false, createdAt: "2024-06-24T18:55:00" },
  { member_seq: 6, party_seq: 2, user_seq: 6, userName: '조경현', imgNo: 6, cost: 6900, status: false, receive: false, isLeader: false, createdAt: "2024-06-24T18:55:00" },
  
  { member_seq: 1, party_seq: 3, user_seq: 1, userName: '조현정', imgNo: 1, cost: 6600, status: true, receive: false, isLeader: false, createdAt: "2024-07-06T01:49:00" },
  { member_seq: 7, party_seq: 3, user_seq: 7, userName: '박수현', imgNo: 7, cost: 20500, status: true, receive: true, isLeader: true, createdAt: "2024-06-22T20:11:00" },
  { member_seq: 8, party_seq: 3, user_seq: 8, userName: '정수화', imgNo: 8, cost: 2500, status: true, receive: true, isLeader: false, createdAt: "2024-06-22T20:11:00" },
  { member_seq: 9, party_seq: 3, user_seq: 9, userName: '송수진', imgNo: 9, cost: 3500, status: true, receive: true, isLeader: false, createdAt: "2024-06-22T20:11:00" },
  { member_seq: 10, party_seq: 3, user_seq: 10, userName: '강선아', imgNo: 10, cost: 5500, status: false, receive: false, isLeader: false, createdAt: "2024-06-22T20:11:00" },
  { member_seq: 11, party_seq: 3, user_seq: 11, userName: '윤소경', imgNo: 11, cost: 1500, status: true, receive: true, isLeader: false, createdAt: "2024-06-22T20:11:00" },

  { member_seq: 1, party_seq: 4, user_seq: 1, userName: '조현정', imgNo: 1, cost: 6600, status: true, receive: false, isLeader: false, createdAt: "2024-07-06T01:49:00" },
  { member_seq: 12, party_seq: 4, user_seq: 12, userName: '최민정', imgNo: 12, cost: 6000, status: true, receive: true, isLeader: false, createdAt: "2024-06-15T11:49:00" },
  { member_seq: 13, party_seq: 4, user_seq: 13, userName: '신동민', imgNo: 13, cost: 7000, status: true, receive: true, isLeader: true, createdAt: "2024-06-15T11:49:00" },
  { member_seq: 14, party_seq: 4, user_seq: 14, userName: '임지연', imgNo: 14, cost: 7500, status: true, receive: true, isLeader: false, createdAt: "2024-06-15T11:49:00" }
];

const groupByMonth = (items, dateKey) => {
  return items.reduce((acc, item) => {
    const month = new Date(item[dateKey]).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
    if (!acc[month]) acc[month] = [];
    acc[month].push(item);
    return acc;
  }, {});
};

function MyTookPage() {
  const [selectedTab, setSelectedTab] = useState('받을 돈');
  const myUserSeq = 1;

  const filteredParties = tempParties.filter(party => {
    const members = tempMembers.filter(member => member.party_seq === party.party_idx);
    const isLeader = members.some(member => member.isLeader === (selectedTab === '받을 돈'));
    return isLeader;
  });

  const groupedParties = groupByMonth(filteredParties, 'createdAt');

  const filteredMembers = tempMembers.filter(member => {
    const party = tempParties.find(p => p.party_idx === member.party_seq);
    return member.user_seq !== myUserSeq && member.isLeader && party;
  });

  const groupedMembers = groupByMonth(filteredMembers, 'createdAt');

  const sendMoneyData = groupedMembers;

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen font-[Nanum Gothic]">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          나의 <span className='font-dela'>took</span>
        </div>
      </div>
      <div className="flex justify-around mt-4 border-b-2 border-gray-200">
        <button
          className={`py-2 ${selectedTab === '받을 돈' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('받을 돈')}
        >
          받을 돈
        </button>
        <button
          className={`py-2 ${selectedTab === '보낼 돈' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('보낼 돈')}
        >
          보낼 돈
        </button>
      </div>
      <div className="mt-2 w-full min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-4">
        {selectedTab === '받을 돈' ? (
          Object.keys(groupedParties).map(month => (
            <div key={month}>
              <div className="text-sm font-bold text-gray-700 mb-4">{month}</div>
              {groupedParties[month].map(party => (
                <Link to={`/tookdetails`} key={party.party_idx}>
                  <HistoryCard {...party} createdAt={formatDate(party.createdAt)} />
                </Link>
              ))}
            </div>
          ))
        ) : (
          Object.keys(sendMoneyData).map(month => (
            <div key={month}>
              <div className="text-sm font-bold text-gray-700 mb-4">{month}</div>
              {sendMoneyData[month].map(member => (
                <SendMoneyCard 
                  key={member.member_seq} 
                  {...member} 
                  status={member.status}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyTookPage;

