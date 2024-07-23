import React from 'react';
import deliveryIcon from '../../../assets/payment/deliveryTook.png';
import taxiIcon from '../../../assets/payment/taxiTook.png';
import payIcon from '../../../assets/payment/payTook.png';
import buyIcon from '../../../assets/payment/buyTook.png';
import nextIcon from '../../../assets/common/nextArrow.png';

const categoryIcons = {
  택시: taxiIcon,
  배달: deliveryIcon,
  정산: payIcon,
  공구: buyIcon,
};

const HistoryCard = ({
  category,
  totalCost,
  status,
  createdAt,
  totalMembers,
  settledMembers,
}) => {
  return (
    <div className="flex flex-col font-bold bg-[#FBFBFB] border border-slate-100 p-4 mb-4 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
        <div className="flex items-center">
          <span className="mr-4">{createdAt}</span>
          <span>|</span>
          <span
            className={`ml-4 ${status === '정산완료' ? 'text-gray-500' : 'text-blue-500'}`}
          >
            {status}
          </span>
        </div>
        <div>
          {status === '정산 진행 중' ? (
            <button className="text-white text-xs font-bold bg-neutral-400/75 px-4 py-1.5 shadow-md rounded-full">
              채팅
            </button>
          ) : (
            <img src={nextIcon} alt="next" className="w-2 h-4" />
          )}
        </div>
      </div>
      <div className="flex items-center">
        <img
          src={categoryIcons[category]}
          alt={category}
          className="w-14 h-14 mr-2"
        />
        <div className="text-black text-sm ml-1">
          <div>총 {totalMembers}명</div>
          <div>{totalCost.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
