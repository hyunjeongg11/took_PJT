import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/delivery/plus.png'; // '+' 아이콘 경로
import mapIcon from '../../assets/delivery/map.png'; // 지도 아이콘 경로

const temp_data_address = [
  {
    storeName: '명지첫집 오션시티직영점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
    deliveryTip: '4000',
  },
  {
    storeName: '롯데리아 부산명지점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
    deliveryTip: '5000',
  },
  {
    storeName: '빙수당 명지국제점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
    deliveryTip: '4500',
  },
  {
    storeName: '페로어페로 부산명지점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
    deliveryTip: '4500',
  },
  {
    storeName: '왔따 쪽갈비 명지점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
    deliveryTip: '4500',
  },
  {
    storeName: '사랑해베이글 명지점',
    pickupPlace: '명지삼정그린코아웨스트 정문',
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

const temp_address = '강서구 녹산동';
const temp_location = '강서구 명지동';


const DeliveryListPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('주소지');

  const handleCreateDelivery = () => {
    navigate('/create/delivery');
  };

  const data = selectedOption === '주소지' ? temp_data_address : temp_data_location;
  const addressText = selectedOption === '주소지' ? temp_address : temp_location;

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 mt-4">
        <div className="mt-2.5 mb-1 ml-4 flex-grow text-left text-3xl font-bold text-main">
          배달 <span className="font-dela">took<span className="font-noto">!</span></span>
        </div>
      </div>
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl text-black ml-2 font-bold mt-2">{addressText}</div>
        </div>

        <div className="flex justify-between mb-7">
          <div className="flex w-1/2 rounded-full border">
            <button
              type="button"
              className={`w-1/2 text-sm font-bold py-2 rounded-l-full border ${selectedOption === '주소지' ? 'bg-neutral-500 text-white' : 'bg-transparent text-gray-900'}`}
              onClick={() => setSelectedOption('주소지')}
            >
              주소지
            </button>
            <button
              type="button"
              className={`w-1/2 text-sm font-bold py-2 rounded-r-full border ${selectedOption === '현위치' ? 'bg-neutral-500 text-white' : 'bg-transparent text-gray-900'}`}
              onClick={() => setSelectedOption('현위치')}
            >
              현위치
            </button>
          </div>
          <button className="bg-white border flex border-neutral-400 text-gray-900 py-2 px-4 rounded-full text-sm font-bold">
            <img src={mapIcon} alt="지도보기" className="w-4.5 h-3.5 mr-2 mt-1" />
            <span>지도 보기</span>
          </button>
        </div>

        {data.map((item, index) => (
          <div key={index} className="my-4">
            <div className="text-lg font-bold text-black">{item.storeName}</div>
            <div className="text-black font-bold text-sm mb-1">{item.pickupPlace}</div>
            <div className="text-neutral-500 font-bold text-xs">배달팁 : {item.deliveryTip}원</div>
            <div className="my-4 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />
          </div>
        ))}
        <button
          className="text-white rounded-full text-lg font-bold fixed bottom-8 right-7"
          onClick={handleCreateDelivery}
        >
          <img src={plusIcon} alt="+" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default DeliveryListPage;
