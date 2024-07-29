import React from 'react';
import BackButton from '../../components/common/BackButton';
import SelectArrow from '../../assets/payment/selectArrow.png';
import ProfileImg from '../../assets/profile/img11.png';
import { formatNumber } from '../../utils/format';
import { useNavigate } from 'react-router-dom';

function PaymentPage({
  userName = '사용자',
  amount,
  account = '국민은행 8910',
  accountBalance = 1620,  // 계좌 잔액 기본값 추가
}) {
  const navigate = useNavigate();

  const handleSendMoney = () => {
    console.log('송금');
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
          <button className="flex items-center space-x-1">
            <span className="text-black font-bold mr-1">
              {account} ({formatNumber(accountBalance)}원)
            </span>
            <img src={SelectArrow} alt="selectArrow" />
          </button>
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
    </div>
  );
}

export default PaymentPage;
