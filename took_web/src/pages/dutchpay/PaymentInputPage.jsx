import React from 'react';
import { Link } from 'react-router-dom';
function PaymentInputPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold my-4 text-main mt-12">
        정산 <span className="font-dela">took!</span>
      </h1>
      <div className="relative flex items-center mb-4 text-main">
        <p className="mb-4 text-sm">정산할 금액을 입력해주세요!</p>
      </div>

      <button className="text-main  mb-4 pb-1 border-main border-b-[1px] text-sm">
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
