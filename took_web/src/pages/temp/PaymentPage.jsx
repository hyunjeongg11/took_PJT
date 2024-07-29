import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import SelectArrow from '../../assets/payment/selectArrow.png';
import ProfileImg from '../../assets/profile/img11.png';
import { formatNumber } from '../../utils/format';
import { banks, stocks } from '../../utils/bankdata';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../../components/payment/AccountCard';

const tempData = [
  {
    bankName: '국민은행',
    accountNum: '1234568910',
    accountName: '별명 미설정',
    balance: 1620,
  },
  {
    bankName: '신한은행',
    accountNum: '0123451234',
    accountName: 'Deep Dream',
    balance: 5400,
  },
  {
    bankName: '우리은행',
    accountNum: '1597535678',
    accountName: '우리 카드',
    balance: 3200,
  },
];


function PaymentPage({
  userName = '사용자',
  amount,
}) {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState(tempData[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMoney = () => {
    console.log('송금');
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto h-screen justify-between">
      <div>
        <div className="flex items-center px-4 py-3">
          <BackButton />
          <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
            정산하기
          </div>
        </div>

        <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div className="mt-10 text-center">
          <img
            src={ProfileImg}
            alt="Watermelon"
            className="w-20 h-20 mx-auto"
          />
          <div className="mt-10 text-xl font-bold text-black">
            {userName} 님에게
          </div>
          <div className="mt-1 text-3xl font-bold text-black">
            {formatNumber(amount)}원
          </div>
          <div className="mt-1 text-xl font-bold text-black">
            <span className="font-dela text-main">took!</span> 할까요?
          </div>
        </div>
      </div>

      <div className="mb-8 text-xs">
        <div className="flex items-center justify-between w-full px-8">
          <div className="text-gray-500 font-bold">출금계좌</div>
          <div className="relative">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-1">
              <span className="text-black font-bold mr-1">
                {selectedAccount.bankName} ({selectedAccount.accountNum.slice(-4)}) ({formatNumber(selectedAccount.balance)}원)
              </span>
              <img src={SelectArrow} alt="selectArrow" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex w-full space-x-6 px-6">
          <button
            className="flex-grow text-lg font-bold text-white py-4 rounded-full bg-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            className="flex-grow text-lg font-bold text-white py-4 rounded-full bg-main shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={handleSendMoney}
          >
            송금하기
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <AccountCard
          accounts={tempData}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleAccountChange}
        />
      )}
    </div>
  );
}

export default PaymentPage;
