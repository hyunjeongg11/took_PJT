import React from 'react';
import { Link } from "react-router-dom";
import BackButton from "../../components/common/BackButton";
import HistoryCard from '../../components/mypage/tookHistory/historyCard'; // historyCard 컴포넌트를 임포트

const mockData = [
  // 목업 데이터
  { 
    party_idx: 1, 
    category: "택시", 
    totalCost: 20500, 
    status: "정산 진행 중", 
    createdAt: "7.6 (토) 01:49", 
    totalMembers: 3, 
    settledMembers: 2 
  },
  { 
    party_idx: 2, 
    category: "배달", 
    totalCost: 71600, 
    status: "정산완료", 
    createdAt: "6.24 (월) 18:55", 
    totalMembers: 4, 
    settledMembers: 4 
  },
  { 
    party_idx: 3, 
    category: "정산", 
    totalCost: 120500, 
    status: "정산완료", 
    createdAt: "6.22 (토) 20:11", 
    totalMembers: 5, 
    settledMembers: 5 
  },
  { 
    party_idx: 4, 
    category: "배달", 
    totalCost: 20500, 
    status: "정산완료", 
    createdAt: "6.15 (토) 11:49", 
    totalMembers: 3, 
    settledMembers: 3 
  }
];

function TookHistoryPage() {
  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          <span className='font-dela'>took</span> 히스토리
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
      <Link to="/tookDetails">
        <div className="flex flex-col mt-4 px-4">
          {mockData.map(party => (
            <HistoryCard key={party.party_idx} {...party} />
          ))}
        </div>
      </Link>
    </div> 
  );
}

export default TookHistoryPage;
