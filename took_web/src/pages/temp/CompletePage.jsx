import React from "react";
import { useNavigate } from "react-router-dom";
import 송금완료 from '../../assets/payment/송금완료.png';
import { formatNumber } from '../../utils/format'; // 숫자 포맷팅 함수 import

function CompletePage({ userName = '사용자', amount = 0 }) {
  const navigate = useNavigate();

  const maskName = (name) => {
    if (name.length <= 2) return name;
    const firstChar = name[0];
    const lastChar = name[name.length - 1];
    const middleChars = name.slice(1, -1).replace(/./g, '*');
    return `${firstChar}${middleChars}${lastChar}`;
  };

  const maskedName = maskName(userName);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-white font-[Nanum_Gothic]">
      <div className="text-2xl font-bold text-[#FF7F50] mb-16 text-center">
        <span className="font-dela">to</span> <span className="font-[Nanum_Gothic] font-bold text-black text-[1.8rem]">{maskedName}</span>,&nbsp; <span className="font-dela">ok!</span>
      </div>
      <img src={송금완료} alt="송금 완료" className="w-[150px] h-[150px] mb-5" />
      <div className="text-[1.6rem] font-bold text-black mb-20 text-center">
        {formatNumber(amount)} 원
      </div>
      <button 
        className="py-3 px-10 bg-[#FF7F50] text-white text-[1.1rem] font-bold rounded-[20px] cursor-pointer mt-10 transition-shadow duration-300"
        onMouseOver={(e) => e.currentTarget.classList.add('shadow-md')}
        onMouseOut={(e) => e.currentTarget.classList.remove('shadow-md')}
        onClick={() => navigate('/')}
      >
        메인으로
      </button>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
        .font-dela {
          font-family: 'Dela Gothic One', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default CompletePage;
