import { React, useEffect, useState } from 'react';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { useLocation } from 'react-router-dom';
import { makePartyApi } from '../../apis/payment/jungsan';
import { useUser } from '../../store/user';
import { insertAllMemberApi } from '../../apis/payment/jungsan';

function PaymentTotalPage() {
  const { seq: userSeq } = useUser();
  const [partySeq, setPartySeq] = useState(null);
  const location = useLocation();
  const paymentsLocation = location.state?.payments || [];
  console.log(paymentsLocation);

  const temp_data = paymentsLocation;
  console.log(temp_data);

  const calculateUserCosts = (temp_data) => {
    console.log('calculateUserCosts함수 실행', calculateUserCosts);
    const userCostsMap = {};

    Object.values(temp_data).forEach((location) => {
      console.log('location 출력', location);
      Object.values(location.users).forEach((user) => {
        const amount = parseFloat(user.amount.replace(/,/g, '')) || 0;
        if (userCostsMap[user.userSeq]) {
          userCostsMap[user.userSeq] += amount;
        } else {
          userCostsMap[user.userSeq] = amount;
        }
      });
    });

    const userCosts = Object.entries(userCostsMap).map(([userSeq, cost]) => ({
      userSeq: Number(userSeq),
      cost,
    }));

    return userCosts;
  };

  useEffect(() => {
    createParty();
  }, []);

  const createParty = async () => {
    try {
      const response = await makePartyApi({
        userSeq: userSeq,
        title: 'Took 정산',
        category: 4,
      });
      if (response && response.partySeq) {
        setPartySeq(response.partySeq);
        console.log('새로 생성된 파티 번호는' + response.partySeq);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const insertAllMemberApiRequest = async () => {
    const userCosts = calculateUserCosts(temp_data);
    const params = {
      partySeq: partySeq,
      userCosts,
    };

    console.log('변환된 형태를 출력합니다', params);

    try {
      const response = await insertAllMemberApi(params);
      if (response) {
        console.log('API Response:', response);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  const totalSum = Object.values(temp_data).reduce(
    (sum, phase) => sum + parseFloat(phase.totalAmount.replace(/,/g, '')),
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
                    key={user.userSeq}
                    loading="lazy"
                    src={getProfileImagePath(user.img_no)}
                    className="w-6 h-6 absolute"
                    alt={`User ${user.userSeq}`}
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

      <div
        className="px-16 py-3.5 mt-10 max-w-full text-base font-extrabold text-white whitespace-nowrap bg-main rounded-2xl shadow-sm w-[197px]"
        onClick={insertAllMemberApiRequest}
      >
        요청하기
      </div>
    </div>
  );
}

export default PaymentTotalPage;
