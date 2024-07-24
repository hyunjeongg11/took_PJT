// src/pages/MyTookMoneyPage.jsx
import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { formatNumber } from '../../utils/format';
import BackButton from "../../components/common/BackButton";
import HistoryCard from '../../components/mypage/tookHistory/historyCard';

// 임의의 데이터
const tempAccounts = [
  { bankName: '국민은행', AccountNum: '1234567891011' },
  { bankName: '신한은행', AccountNum: '9876543210123' },
  { bankName: '우리은행', AccountNum: '1231231231231' },
];

const tempHistory = [
  { userName: '조*정', imgNo: 1, createdAt: '24.06.12', cost: 6600, type: '받기' },
  { userName: '차*주', imgNo: 2, createdAt: '24.06.04', cost: 20000, type: '송금' },
  { userName: '이*찬', imgNo: 3, createdAt: '24.05.28', cost: 5400, type: '송금' },
];

const tempParty = [
  { party_idx: 1, category: '택시', totalMembers: 3, totalCost: 20500, status: "정산완료", createdAt: "7.6 (토) 01:49" },
  { party_idx: 2, category: '배달', totalMembers: 4, totalCost: 71600, status: "정산완료", createdAt: "6.24 (월) 18:55" },
];

const getImagePath = (bankName) => {
  const bankImages = import.meta.glob('../../assets/payment/bank/*.png', { eager: true });
  const stockImages = import.meta.glob('../../assets/payment/stock/*.png', { eager: true });

  if (bankName.endsWith("은행")) {
    bankName = bankName.slice(0, -2);
    return bankImages[`../../assets/payment/bank/${bankName}.png`]?.default || '';
  }
  if (bankName.endsWith("증권")) {
    bankName = bankName.slice(0, -2);
    return stockImages[`../../assets/payment/stock/${bankName}.png`]?.default || '';
  }
  return bankImages[`../../assets/payment/bank/${bankName}.png`]?.default || '';
};

const getProfileImagePath = (imgNo) => {

  const profileImages = import.meta.glob('../../assets/profile/*.png', { eager: true });
  return profileImages[`../../assets/profile/img${imgNo}.png`]?.default || '';
};

const MyTookMoneyPage = () => {
  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          나의 툭머니
        </div>
      </div>
      <div className="flex items-center justify-between mb-5 p-3 bg-[#FBFBFB] rounded-lg shadow-md mx-4">
        <span className="text-black text-sm">등록 계좌</span>
        <div className="flex items-center text-sm font-bold">
          <img src={getImagePath(tempAccounts[0].bankName)} alt="은행 로고" className="w-6 h-6 mr-2" />
          {tempAccounts[0].bankName} 외 {tempAccounts.length - 1}개
        </div>
      </div>
      <div className="mx-4">
        <div className="bg-[#FBFBFB] p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-lg font-bold mb-2">
            거래내역
            <AiOutlineRight className="text-xl" />
          </div>
          {tempHistory.map((transaction, index) => (
            <div key={index} className="flex justify-between py-3 border-b border-gray-300 mb-3">
              <div className="flex items-center">
                <img src={getProfileImagePath(transaction.imgNo)} alt={transaction.userName} className="w-9 h-9 mr-5" />
                <div>
                  <div className="text-sm font-bold">{transaction.userName}</div>
                  <div className="text-xs text-gray-500">{transaction.createdAt}</div>
                </div>
              </div>
              <div className={`text-sm font-bold ${transaction.type === "받기" ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === '받기' ? '+ ' : '- '}{formatNumber(Math.abs(transaction.cost))}원
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 mx-4">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-lg font-bold mb-2">
            <div>나의 <span className='font-dela'> took</span></div>
            <AiOutlineRight className="text-xl" />
          </div>
          {tempParty.map((settlement, index) => (
            <HistoryCard key={index} {...settlement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTookMoneyPage;