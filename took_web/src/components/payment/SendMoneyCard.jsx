import React from 'react';
import getProfileImagePath from '../../utils/getProfileImagePath';
import formatNumber from '../../utils/format';
import { formatDateWithoutTime } from '../../utils/formatDate';

const SendMoneyCard = ({ imgNo, userName, cost, createdAt, status }) => {
  return (
    <div className={`flex justify-between items-center p-5 mb-4 bg-white border border-slate-100 rounded-2xl shadow-lg ${status ? 'opacity-50' : ''}`}>
      <div className="flex items-center">
        <img src={getProfileImagePath(imgNo)} alt={userName} className="w-10 h-10 mr-4" />
        <div>
          <div className="text-sm font-bold">{userName}</div>
          <div className="text-lg font-bold">{formatNumber(cost)}원</div>
        </div>
      </div>
      <div className="text-right flex flex-col justify-between items-end h-full">
        <div className="text-xs text-gray-500 mb-2">{formatDateWithoutTime(createdAt)}</div>
        {status ? (
          <div className="text-xs text-gray-500">송금완료</div>
        ) : (
          <button className="text-xs text-white bg-main py-1 px-2 rounded mt-auto">송금하기</button>
        )}
      </div>
    </div>
  );
};

export default SendMoneyCard;
