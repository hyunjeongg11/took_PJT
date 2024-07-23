import React, { useState } from 'react';

// 임시 데이터
const phaseData = {
    1: {
        users: [
            { img_no: 6 },
            { img_no: 1 },
            { img_no: 2 },
            { img_no: 3 },
            { img_no: 4 }
        ],
        totalAmount: 50000
    },
    2: {
        users: [
            { img_no: 6 },
            { img_no: 1 },
            { img_no: 2 },
            { img_no: 3 },
            { img_no: 4 }
        ],
        totalAmount: 50000
    }
};

function PaymentTotalPage() {
    const [phase, setPhase] = useState(2); // 기본적으로 2차

    // 현재 단계에 해당하는 데이터
    const { users, totalAmount } = phaseData[phase] || { users: [], totalAmount: 0 };

    // 단계 변경 함수
    const handlePhaseChange = (newPhase) => {
        setPhase(newPhase);
    };

    // 모든 차수의 총 금액 계산
    const totalSum = Object.values(phaseData).reduce((sum, phase) => sum + phase.totalAmount, 0);

    return (
        <div className="flex flex-col items-center px-14 py-20 bg-white max-w-[360px]">
            <div className="text-4xl text-orange-400">
                <span className="text-3xl font-bold text-orange-400">정산 </span>
                <span className="text-orange-400 font-dela">took !</span>
            </div>
            <div className="mt-4 text-sm text-orange-400">
                정산 정보를 확인해주세요
            </div>
            <div className="flex flex-col gap-5 self-stretch mt-16">
                <div className="flex flex-col items-center">
                    <div className="self-center text-xs font-bold text-orange-400">
                        [{phase}차]
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-3 relative" style={{ width: '150px', height: '150px' }}>
                        {users.map((user, index) => (
                            <img
                                key={user.img_no}
                                loading="lazy"
                                src={`/src/assets/profile/img${user.img_no}.png`}
                                className="w-12 h-12 absolute"
                                alt={`User ${user.img_no}`}
                                style={{
                                    transform: `translate(${Math.sin((2 * Math.PI / users.length) * index) * 50}px, ${Math.cos((2 * Math.PI / users.length) * index) * 50}px)`,
                                    zIndex: users.length - index
                                }}
                            />
                        ))}
                    </div>
                    <div className="mt-5 text-base font-extrabold text-orange-400">
                        {totalAmount.toLocaleString()}원
                    </div>
                </div>
            </div>
            <div className="mt-16 text-4xl font-extrabold text-orange-400">
                {totalSum.toLocaleString()}원
            </div>
            <div className="px-16 py-3.5 mt-10 max-w-full text-base font-extrabold text-white whitespace-nowrap bg-orange-400 rounded-2xl shadow-sm w-[197px]">
                요청하기
            </div>
        </div>
    );
}

export default PaymentTotalPage;
