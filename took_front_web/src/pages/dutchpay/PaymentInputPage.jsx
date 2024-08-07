import React, { useState } from "react";
import { Link } from "react-router-dom";
import PaymentCard from "../../components/payment/PaymentCard";

function PaymentInputPage() {
    const [payments, setPayments] = useState([
        { name: "정희수", img_no: 6, amount: null },
        { name: "조현정", img_no: 1, amount: null },
        { name: "차민주", img_no: 2, amount: null },
        { name: "김태훈", img_no: 3, amount: null },
        { name: "공지환", img_no: 4, amount: null },
    ]);

    const handlePaymentChange = (index, amount) => {
        const updatedPayments = [...payments];
        updatedPayments[index].amount = amount;
        setPayments(updatedPayments);
    };

    const addNewPayment = () => {
        const newPayment = { name: `사용자 ${payments.length + 1}`, img_no: payments.length, amount: null };
        setPayments([...payments, newPayment]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-20">
            <h1 className="text-4xl font-bold my-3 text-main mt-12">
                정산 <span className="font-dela">took!</span>
            </h1>
            <div className="relative flex items-center  text-main">
                <p className="mb-4 text-sm">정산할 금액을 입력해주세요!</p>
            </div>
            
            <PaymentCard
                payments={payments}
                setPayments={setPayments}
            />

            <button
                className="text-main mb-4 pb-1 border-main border-b-[1px] text-sm"
                onClick={addNewPayment}
            >
                차수 추가하기
            </button>
            <Link to="/dutch/input">
                <button className="bg-main px-12 py-2 shadow font-bold text-white rounded-full">
                    정산 요청하기
                </button>
            </Link>
        </div>
    );
}

export default PaymentInputPage;
