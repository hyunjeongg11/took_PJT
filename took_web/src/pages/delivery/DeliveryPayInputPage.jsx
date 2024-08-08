import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatNumber } from '../../utils/format';
import BackButton from '../../components/common/BackButton';

function DeliveryPayInputPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 임시 데이터 todo
  const { participants } = location.state || {
    participants: [
      { member_seq: 1, userName: '참가자1' },
      { member_seq: 2, userName: '참가자2' },
      { member_seq: 3, userName: '참가자3' },
      { member_seq: 4, userName: '참가자4' },
    ],
  };

  const [orderAmounts, setOrderAmounts] = useState(Array(participants.length).fill(''));
  const [tipAmount, setTipAmount] = useState('');

  const handleOrderAmountChange = (index, value) => {
    const formattedValue = formatNumber(value.replace(/,/g, '')); // Remove existing commas and format
    const newOrderAmounts = [...orderAmounts];
    newOrderAmounts[index] = formattedValue;
    setOrderAmounts(newOrderAmounts);
  };

  const handleTipAmountChange = (value) => {
    const formattedValue = formatNumber(value.replace(/,/g, '')); // Remove existing commas and format
    setTipAmount(formattedValue);
  };

  const handleSubmit = () => {
    navigate('/payment'); 
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen overflow-y-scroll">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          주문 금액
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col items-center mt-8">
        <div className="text-left w-64 mb-1">배달 팁</div>
        <div className="text-left shadow-md rounded-xl border border-neutral-200 py-2 mb-6 w-64">
          <input
            type="text"
            className="text-lg ml-5 w-full outline-none box-border"
            placeholder="배달 팁(원)"
            value={tipAmount}
            onChange={(e) => handleTipAmountChange(e.target.value)}
          />
        </div>
        {participants.map((participant, index) => (
          <div key={participant.member_seq} className="mb-6 w-64">
            <div className="text-left mb-1">{participant.userName}</div>
            <div className="text-left shadow-md rounded-xl border border-neutral-200 py-2">
              <input
                type="text"
                className="text-lg ml-5 w-full outline-none box-border"
                placeholder="주문 금액(원)"
                value={orderAmounts[index]}
                onChange={(e) => handleOrderAmountChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
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
