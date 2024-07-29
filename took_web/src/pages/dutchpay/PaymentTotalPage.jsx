import React from 'react';
import getProfileImagePath from '../../utils/getProfileImagePath';

const temp_data = {
  1: {
    users: [
      { name: '정희수', img_no: 1, amount: '0' },
      { name: '조현정', img_no: 5, amount: '0' },
      { name: '차민주', img_no: 2, amount: '0' },
      { name: '김태훈', img_no: 3, amount: '0' },
    ],
    totalAmount: 45000,
  },
  2: {
    users: [
      { name: '정희수', img_no: 1, amount: '0' },
      { name: '조현정', img_no: 5, amount: '0' },
      { name: '차민주', img_no: 2, amount: '0' },
      { name: '김태훈', img_no: 3, amount: '0' },
      { name: '공지환', img_no: 4, amount: '0' },
    ],
    totalAmount: 50000,
  },
  3: {
    users: [
      { name: '정희수', img_no: 1, amount: '0' },
      { name: '조현정', img_no: 5, amount: '0' },
      { name: '차민주', img_no: 2, amount: '0' },
      { name: '김태훈', img_no: 3, amount: '0' },
    ],
    totalAmount: 45000,
  },
  4: {
    users: [
      { name: '정희수', img_no: 1, amount: '0' },
      { name: '조현정', img_no: 5, amount: '0' },
      { name: '차민주', img_no: 2, amount: '0' },
      { name: '김태훈', img_no: 3, amount: '0' },
      { name: '공지환', img_no: 4, amount: '0' },
    ],
    totalAmount: 50000,
  },
};

function PaymentTotalPage() {
  // 모든 차수의 총 금액 계산
  const totalSum = Object.values(temp_data).reduce(
    (sum, phase) => sum + phase.totalAmount,
    0
  );

  return (
    <div className="flex flex-col items-center px-14 py-20 bg-white max-w-[600px] mx-auto">
      <div className="text-4xl text-main">
        <span className="text-3xl font-bold text-main">정산 </span>
        <span className="text-main font-dela">took !</span>
      </div>
      <div className="mt-4 text-sm text-main">정산 정보를 확인해주세요</div>
      <div className="flex gap-5 self-stretch justify-center mt-16 opacity-80">
        {Object.keys(temp_data).map((phaseKey) => {
          const { users, totalAmount } = temp_data[phaseKey];

          return (
            <div key={phaseKey} className="flex flex-col items-center">
              <div className="self-center text-xs font-bold text-main">
                [{phaseKey}차]
              </div>
              <div
                className="flex animate-semijump flex-wrap items-center justify-center gap-2 mt-3 relative"
                style={{ width: '60px', height: '60px' }}
              >
                {users.map((user, index) => (
                  <img
                    key={user.img_no}
                    loading="lazy"
                    src={getProfileImagePath(user.img_no)}
                    className="w-6 h-6 absolute"
                    alt={`User ${user.img_no}`}
                    style={{
                      transform: `translate(${Math.sin(((2 * Math.PI) / users.length) * index) * 15}px, ${Math.cos(((2 * Math.PI) / users.length) * index) * 15}px)`,
                      zIndex: users.length - index,
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 text-sm font-extrabold text-main">
                {totalAmount.toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-16 text-4xl font-extrabold text-main">
        {totalSum.toLocaleString()}원
      </div>
      <div className="px-16 py-3.5 mt-10 max-w-full text-base font-extrabold text-white whitespace-nowrap bg-main rounded-2xl shadow-sm w-[197px]">
        요청하기
      </div>
    </div>
  );
}

export default PaymentTotalPage;
