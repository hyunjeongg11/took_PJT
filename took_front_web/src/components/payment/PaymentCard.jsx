import React, { useState, useEffect } from "react";
import { formatNumber } from "../../utils/format";

const PaymentCard = ({ payments, setPayments }) => {
    const [totalAmount, setTotalAmount] = useState("");

    useEffect(() => {
        // totalAmount가 비어 있지 않은 경우만 처리
        if (totalAmount !== "") {
            // 문자열을 숫자로 변환
            const total = parseFloat(totalAmount.replace(/,/g, ''));
            if (!isNaN(total) && total >= 0) {
                const numOfPayments = payments.length;
                const averageAmount = Math.ceil(total / numOfPayments);
                const remainingAmount = total - (averageAmount * (numOfPayments - 1));

                const updatedPayments = payments.map((payment, index) => {
                    return { ...payment, amount: formatNumber(index === numOfPayments - 1 ? remainingAmount : averageAmount) };
                });
                setPayments(updatedPayments);
            }
        }
    }, [totalAmount, payments, setPayments]);

    const handleAmountChange = (index, amount) => {
        const updatedPayments = [...payments];
        updatedPayments[index].amount = formatNumber(amount);
        setPayments(updatedPayments);
    };

    return (
        <div className="mt-4 mb-6 text-main">
            <div className="flex items-center gap-2 mb-10 font-extrabold text-3xl">
                <input
                    type="text"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(formatNumber(e.target.value))}
                    placeholder=""
                    className="px-2 py-1 border-b-[1px] border-main border-opacity-40 text-center w-full max-w-xs"
                />
                <span>원</span>
            </div>
            <div className="text-main p-1 text-xs mb-2 underline">인원 추가</div>
            <div className="flex flex-col gap-4 self-stretch mt-2">
                {payments.map((payInfo, index) => (
                    <div key={index} className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-3 text-sm font-semibold">
                            <img
                                loading="lazy"
                                srcSet={`/src/assets/profile/img${payInfo.img_no}.png`}
                                className="w-8 h-8"
                                alt={payInfo.name}
                            />
                            <div className="w-24">{payInfo.name}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={payInfo.amount || ""}
                                onChange={(e) => handleAmountChange(index, e.target.value)}
                                placeholder=""
                                className="w-full max-w-xs px-2 py-1 border-b-[1px] border-main border-opacity-50 text-right font-semibold"
                                style={{ minWidth: "80px" }}
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3f9a2394cc2191cd008c8dab3edbceb90b6adf5025fc60fcb23c80910d0f59b?"
                                className="shrink-0 aspect-[0.82] fill-orange-400 w-2 mt-2 opacity-80"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentCard;
