import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userProfile1 from '../../assets/profile/img7.png'; // 사용자 프로필 아이콘 경로
import plusIcon from '../../assets/delivery/plus.png'; // '+' 아이콘 경로

const temp_data_address = [
  {
    storeName: '맘스터치 부산신호점',
    pickupPlace: '송정삼정그린코아시티 정문',
    deliveryTip: '4000',
  },
  {
    storeName: 'BBQ치킨 명지점',
    pickupPlace: '송정삼정그린코아시티 정문',
    deliveryTip: '5000',
  },
];

const temp_data_location = [
  {
    storeName: '지코바 신호점',
    pickupPlace: '삼성전기 정문',
    deliveryTip: '4500',
  },
  {
    storeName: '설빙 신호점',
    pickupPlace: '송정삼정그린코아시티 정문',
    deliveryTip: '5000',
  },
  {
    storeName: '히스피커피&디저트 신호점',
    pickupPlace: '송정삼정그린코아시티 정문',
    deliveryTip: '4500',
  },
];

const DeliveryListPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('주소지');

  const handleCreateDelivery = () => {
    navigate('/create/delivery');
  };

  const data = selectedOption === '주소지' ? temp_data_address : temp_data_location;

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 mt-4">
        <div className="mt-2.5 ml-2 flex-grow text-left text-3xl font-bold text-main">
          배달 <span className="font-dela">took<span className="font-noto">!</span></span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg ml-2 font-bold mt-2">강서구 녹산동</div>

        </div>

        <div className="flex justify-between mb-4">
          <div className="flex w-2/3">
            <button
              type="button"
              className={`w-1/2 text-sm font-bold py-2 rounded-l-full border ${selectedOption === '주소지' ? 'bg-neutral-400 text-white' : 'bg-transparent text-gray-900 border-neutral-400'}`}
              onClick={() => setSelectedOption('주소지')}
            >
              주소지
            </button>
            <button
              type="button"
              className={`w-1/2 text-sm font-bold py-2 rounded-r-full border ${selectedOption === '현위치' ? 'bg-neutral-400 text-white' : 'bg-transparent text-gray-900 border-neutral-400'}`}
              onClick={() => setSelectedOption('현위치')}
            >
              현위치
            </button>
          </div>
          <button className="bg-white border border-neutral-400 text-gray-900 py-2 px-4 rounded-full text-sm font-bold">
            지도 보기
          </button>
        </div>

        {data.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="text-lg font-bold">{item.storeName}</div>
            <div className="text-gray-700 font-bold text-base">{item.pickupPlace}</div>
            <div className="text-gray-700 text-sm">배달팁 : {item.deliveryTip}원</div>
            <div className="my-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          </div>
        ))}
        <button
          className="text-white py-2 px-10 rounded-full text-lg font-bold fixed bottom-8 right-4"
          onClick={handleCreateDelivery}
        >
          <img src={plusIcon} alt="+" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default DeliveryListPage;
