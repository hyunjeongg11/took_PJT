import React from 'react';
import { useNavigate } from 'react-router-dom';
import 송금완료 from '../../assets/payment/송금완료.png';
import { formatNumber } from '../../utils/format';
import { maskName } from '../../utils/formatName';

function CompletePage() {
  const navigate = useNavigate();

  // 임시 데이터
  const tempMember = {
    userName: '조현정',
    cost: 6500,
    bank: '국민은행',
    accountNumber: '12345678910',
  };

  const maskedName = maskName(tempMember.userName);

  return (
    <div className="flex flex-col items-center justify-between h-[90vh] bg-white font-[Nanum_Gothic] pb-10 pt-20">
      {' '}
      {/* 상단에 padding-top 추가 */}
      <div className="text-4xl font-bold text-[#FF7F50] mb-16 text-center">
        <span className="font-dela">to</span>{' '}
        <span className="font-[Nanum_Gothic] font-bold text-black text-[1.8rem]">
          {maskedName}
        </span>
        ,&nbsp; <span className="font-dela">ok!</span>
      </div>
      <div className="flex flex-col items-center mb-20">
        {' '}
        {/* 하단에 margin-bottom 추가 */}
        <img
          src={송금완료}
          alt="송금 완료"
          className="w-[150px] h-[150px] mb-5"
        />
        <div className="text-sm text-center mb-1">
          {maskName(tempMember.userName)} 님에게
        </div>
        <div className="text-sm mb-5">
          <span className="font-extrabold">
            {formatNumber(tempMember.cost)}
          </span>
          원을 보냈어요.
        </div>
        <div className="w-64 border-t border-b border-gray-300 py-2 mt-5">
          <div className="flex justify-between w-full mt-1 mb-1 px-1">
            <div className="text-sm">출금 계좌</div>
            <div className="text-sm">
              {tempMember.bank}({tempMember.accountNumber.slice(-4)})
            </div>
          </div>
        </div>
      </div>
      <button
        className={`w-[calc(100%-40px)] py-3 rounded-full bg-[#FF7F50] text-white text-lg font-bold cursor-pointer mt-auto mb-5`} // 여기에 mt-auto 추가
        onMouseOver={(e) => e.currentTarget.classList.add('shadow-md')}
        onMouseOut={(e) => e.currentTarget.classList.remove('shadow-md')}
        onClick={() => navigate('/')}
      >
        메인으로
      </button>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
          .font-dela {
            font-family: 'Dela Gothic One', sans-serif;
          }
        `}
      </style>
    </div>
  );
}

export default CompletePage;
