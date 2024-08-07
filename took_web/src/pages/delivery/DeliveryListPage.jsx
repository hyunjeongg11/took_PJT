import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDeliveryListApi } from '../../apis/delivery';
import { formatBeforeTime, formatFinishTime } from '../../utils/formatDate';
import plusIcon from '../../assets/delivery/plus.png'; // '+' 아이콘 경로
import mapIcon from '../../assets/delivery/map.png'; // 지도 아이콘 경로
import BackButton from '../../components/common/BackButton';

const DeliveryListPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('주소지');
  const [deliveryList, setDeliveryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryList = async () => {
      try {
        // 임시로 위경도 0으로 설정
        const params = {
          lat: 0.0,
          lon: 0.0,
        };
        const response = await getDeliveryListApi(params);
        const openList = response.filter((item) => item.status === 'OPEN');
        const sortedList = openList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDeliveryList(sortedList || []);
      } catch (error) {
        console.error('배달 목록을 가져오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryList();
  }, []);

  const handleCreateDelivery = () => {
    navigate('/delivery/create');
  };

  const handleDetailClick = (deliverySeq) => {
    navigate(`/delivery/detail/${deliverySeq}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 mt-4">
        <BackButton />
        <div className="flex-grow text-center">
          <span className="mt-2.5 mb-1 text-3xl font-bold text-main">
            배달{' '}
            <span className="font-dela">
              took<span className="font-noto">!</span>
            </span>
          </span>
        </div>
      </div>

      <div className="px-6 mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl text-black ml-2 font-bold mt-2">
            주변 배달 목록
          </div>
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
            <img
              src={mapIcon}
              alt="지도보기"
              className="w-4.5 h-3.5 mr-2 mt-1"
            />
            <span>지도 보기</span>
          </button>
        </div>

        {deliveryList.map((item, index) => (
          <div
            key={index}
            className="my-4 cursor-pointer"
            onClick={() => handleDetailClick(item.deliverySeq)}
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-black">
                {item.storeName}
              </div>
              <div className="text-xs text-gray-500">
                {formatBeforeTime(item.createdAt)}
              </div>
            </div>
            <div className="text-black font-bold text-sm mb-1">
              {item.pickupPlace}
            </div>
            <div className="my-1">
              <div className="text-neutral-500 font-bold text-xs">
                배달팁 : {item.deliveryTip}원
              </div>
              {/* <div className="text-neutral-500 font-bold text-xs">주문 종료 : {formatFinishTime(item.deliveryTime)}</div> */}
            </div>
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
