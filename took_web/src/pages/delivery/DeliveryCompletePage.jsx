import React from 'react';
import { useNavigate } from "react-router-dom";
import deliveryIcon from "../../assets/delivery/delivery.png"

function DeliveryCompletePage() {
  // const navigate = useNavigate();

  // const handleConfirmClick = () => {
  //   // 수령 확인 클릭 시의 로직을 추가
  //   navigate("/"); // 클릭 시 이동할 경로 설정
  // };

  return (
    <div className="flex flex-col items-center bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 mt-20 mb-14">
        <div className="mt-2.5 mb-1 flex-grow text-center text-4xl font-bold text-main">
          배달 <span className="font-dela">took<span className="font-noto">!</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center flex-grow">
        <div className="text-2xl font-bold text-black mt-20">배달 물건(음식) <span className='font-normal text-2xl'>을</span></div>
        <div className="text-2xl font-bold text-black">수령<span className='font-normal text-2xl'>하셨나요?</span></div>
        <img src={deliveryIcon} alt="배달 아이콘" className="my-8 w-14 h-11" />
      </div>

      <button
        // onClick={handleConfirmClick}
        className="py-3 px-10 bg-main text-white text-[1.1rem] font-bold rounded-xl mb-8 w-60"
      >
        수령 확인
      </button>
    </div>
  );
}

export default DeliveryCompletePage;
