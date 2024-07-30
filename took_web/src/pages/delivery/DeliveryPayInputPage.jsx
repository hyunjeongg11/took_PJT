import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import { useNavigate } from 'react-router-dom';
import { MdBackspace } from 'react-icons/md';

// const tempUser = '주최자'; // 유저에 따라 다른 창이 뜸
// const tempUser = '참여자';

const tempUser = { member_seq: 1, party_seq: 1, user_seq: 1, userName: '조현정', imgNo: 19, cost: 13000, real_cost: 12000, status: true, receive: false, is_leader: true, created_at: '2024-07-06T00:23:00' };


function DeliveryPayInputPage() {
  const [orderAmount, setOrderAmount] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [isOrderAmount, setIsOrderAmount] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = (value) => {
    if (isOrderAmount) {
      setOrderAmount(orderAmount + value);
    } else {
      setTipAmount(tipAmount + value);
    }
  };

  const handleBackspaceClick = () => {
    if (isOrderAmount) {
      setOrderAmount(orderAmount.slice(0, -1));
    } else {
      setTipAmount(tipAmount.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    navigate('/payment'); // Navigate to PaymentPage on submit
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          주문 금액
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col items-center mt-8">
        <div className="text-left shadow-md rounded-xl border border-neutral-200 py-2 mb-6 w-64">
          <input
            type="number"
            className="text-lg ml-5"
            placeholder="주문 금액(원)"
            value={orderAmount}
            onClick={() => setIsOrderAmount(true)}
            inputMode="none" // 자체 키보드 있으니까
            readOnly
          />
        </div>
        {tempUser.is_leader && (
          <div className="text-left shadow-md rounded-xl border border-neutral-200 py-2 mb-6 w-64">
            <input
              type="number"
              className="text-lg ml-5"
              placeholder="배달 팁(원)"
              value={tipAmount}
              onClick={() => setIsOrderAmount(false)}
              inputMode="none"
              readOnly
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 font-bold mx-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className="text-2xl py-4 rounded-full"
            onClick={() => handleButtonClick(number.toString())}
          >
            {number}
          </button>
        ))}
        <div></div>
        <button
          className="text-2xl py-4 rounded-full"
          onClick={() => handleButtonClick('0')}
        >
          0
        </button>
        <button
          className="text-2xl py-4 rounded-full"
          onClick={handleBackspaceClick}
        >
          <MdBackspace size={24} className="ml-8" />
        </button>
      </div>

      <button
        className="py-3 px-10 place-self-center bg-main text-white text-[1.1rem] font-bold rounded-xl cursor-pointer mt-8 w-80"
        onClick={handleSubmit}
      >
        확인
      </button>
    </div>
  );
}

export default DeliveryPayInputPage;
