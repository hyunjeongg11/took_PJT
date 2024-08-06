import React, { useState, useEffect } from 'react';
import { formatNumber } from '../../utils/format';
import getProfileImagePath from '../../utils/getProfileImagePath';

const PaymentCard = ({ payment, setPayment, onDelete, onCardDelete }) => {
  const [totalAmount, setTotalAmount] = useState(formatNumber(payment.totalAmount));

  useEffect(() => {
    const total = parseFloat(totalAmount.replace(/,/g, '')) || 0;
    const numOfPayments = payment.users.length;
    const averageAmount = Math.floor(total / numOfPayments);
    const remainingAmount = total - averageAmount * (numOfPayments - 1);

    const updatedUsers = payment.users.map((user, index) => ({
      ...user,
      amount: formatNumber(
        index === numOfPayments - 1 ? remainingAmount : averageAmount
      ),
    }));

    setPayment({ ...payment, users: updatedUsers, totalAmount: formatNumber(total) });
  }, [totalAmount, payment.users.length]);

  const handleAmountChange = (index, amount) => {
    const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    const updatedUsers = payment.users.map((user, idx) =>
      idx === index ? { ...user, amount: formatNumber(numericAmount) } : user
    );

    setPayment({ ...payment, users: updatedUsers });
  };

  const handleTotalAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
      setTotalAmount(formatNumber(value));
    } else if (value === '') {
      setTotalAmount('0');
    }
  };

  return (
    <div className="px-12 pb-6 bg-white ">
      <div className="border-gray-300 border rounded-2xl shadow-md p-6 ">
        <button
          onClick={onCardDelete} // 클릭 시 카드 삭제
          className="relative top-0 left-0 rounded-full p-1 text-main"
        >
          <span className="text-xl">×</span>
        </button>
        <div className="flex gap-x-2 mb-3 text-right text-main font-extrabold text-2xl">
          <input
            type="text"
            value={totalAmount}
            onChange={handleTotalAmountChange}
            placeholder=""
            className="mx-1 text-right w-full max-w-xs"
          />
          <span>원</span>
        </div>
        <div className="text-main p-1 text-xs mb-2 underline">인원 추가</div>
        <div className="flex flex-col gap-3 overflow-y-scroll h-[30vh] scroll-m-1">
          {payment.users.map((user, index) => (
            <div key={index} className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <img
                  loading="lazy"
                  src={getProfileImagePath(user.img_no)}
                  className="w-6 h-6 animate-shake"
                  alt={user.name}
                />
                <div className="w-24 text-xs">{user.name}</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={user.amount || ''}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  placeholder=""
                  className="w-full max-w-xs px-2 py-1 border-b-[1px] border-main border-opacity-50 text-right font-semibold"
                  style={{ minWidth: '80px' }}
                />
                <img
                  onClick={() => {
                    onDelete(index);
                    handleTotalAmountChange();
                  }}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3f9a2394cc2191cd008c8dab3edbceb90b6adf5025fc60fcb23c80910d0f59b?"
                  className="shrink-0 aspect-[0.82] fill-orange-400 w-2 mt-2 opacity-80"
                  alt="icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
