// src/pages/TransactionHistoryPage.jsx
import React, { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { formatNumber } from '../../utils/format';
import BackButton from "../../components/common/BackButton";

const tempTransactions = [
  { userName: '조*정', imgNo: 1, createdAt: '2024-07-17 17:55', cost: 6600, type: '받기', bankName: '국민은행', accountNum: '12345678910' },
  { userName: '차*주', imgNo: 2, createdAt: '2024-07-13 16:32', cost: 20000, type: '송금', bankName: '국민은행', accountNum: '12345678910' },
  { userName: '이*찬', imgNo: 12, createdAt: '2024-07-13 10:12', cost: 5400, type: '송금', bankName: '신한은행', accountNum: '85236952354' },
  { userName: '공*환', imgNo: 4, createdAt: '2024-07-09 17:55', cost: 6600, type: '받기', bankName: '국민은행', accountNum: '12345678910' },
  { userName: '김*훈', imgNo: 5, createdAt: '2024-07-09 10:12', cost: 5400, type: '송금', bankName: '신한은행', accountNum: '85236952354' },
  { userName: '조*정', imgNo: 7, createdAt: '2024-06-25 11:08', cost: 6800, type: '받기', bankName: '신한은행', accountNum: '85236952354' },
  { userName: '이*찬', imgNo: 8, createdAt: '2024-06-29 18:46', cost: 22500, type: '받기', bankName: '신한은행', accountNum: '85236952354' },
  { userName: '차*주', imgNo: 16, createdAt: '2024-01-15 9:34', cost: 13600, type: '송금', bankName: '신한은행', accountNum: '85236952354' },
  { userName: '조*정', imgNo: 19, createdAt: '2023-06-28 2:52', cost: 9600, type: '송금', bankName: '신한은행', accountNum: '85236952354' },
];

const getProfileImagePath = (imgNo) => {
  const profileImages = import.meta.glob('../../assets/profile/*.png', { eager: true });
  return profileImages[`../../assets/profile/img${imgNo}.png`]?.default || '';
};

const TransactionHistoryPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('전체');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const getStartDate = (period) => {
    const startDate = new Date();
    switch (period) {
      case '1주일':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '1개월':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3개월':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6개월':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1년':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        return '';
    }
    return startDate.toISOString().split('T')[0];
  };

  const startDateString = getStartDate(selectedPeriod);

  const filteredTransactions = selectedPeriod === '전체' ? tempTransactions : tempTransactions.filter(transaction => transaction.createdAt.split(' ')[0] >= startDateString);

  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const date = transaction.createdAt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleSelect = (period) => {
    setSelectedPeriod(period);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen font-[Nanum Gothic]">
      <div className="flex items-center mb-3 border-b border-gray-300 px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          거래내역
        </div>
      </div>
      <div className="flex items-center text-sm font-bold justify-between border-b border-gray-800 ml-4 mr-4 px-2 py-1 ">
        <span>{startDateString ? `${startDateString} ~ ${todayString}` : '전체 기간'}</span>
        <div className="relative w-20"> 
          <div
            className="border border-gray-300 rounded p-1 text-sm appearance-none pr-10 focus:outline-none cursor-pointer w-full"
            onClick={toggleDropdown}
          >
            {selectedPeriod}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
          </div>
          {dropdownOpen && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
              {['전체', '1주일', '1개월', '3개월', '6개월', '1년'].map((option) => (
                <div
                  key={option}
                  className={`px-1 py-2 cursor-pointer flex items-center w-full ${selectedPeriod === option ? 'text-black' : 'text-gray-700'}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="text-black ml-3">{option}</span>
                  {selectedPeriod === option && <span className="text-black ml-2">✔</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto">
        <div className="px-4 py-2">
          {Object.keys(groupedTransactions).map(date => (
            <div key={date}>
              <div className="text-xs font-bold text-gray-700 mb-2 mt-4">{new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</div>
              {groupedTransactions[date].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-300 mt-2 mb-2">
                  <div className="flex items-center">
                    <img src={getProfileImagePath(transaction.imgNo)} alt={transaction.userName} className="w-8 h-8 mr-4 ml-3" />
                    <div>
                      <div className="text-sm font-bold">{transaction.userName}</div>
                      <div className="text-xs text-gray-500">{transaction.createdAt.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold mb-1 ${transaction.type === '받기' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === '받기' ? '+ ' : '- '}{formatNumber(transaction.cost)}원
                    </div>
                    <div className="text-xs text-gray-500">{transaction.bankName}({transaction.accountNum.slice(-4)}) | {transaction.type}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
