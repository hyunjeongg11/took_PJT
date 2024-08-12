import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import BackButton from '../../components/common/BackButton';
import SearchDropdown from '../../components/map/SearchDropDown';
import {
  calculateIndividualExpectedCostApi,
  setDestinationAndCostApi,
  getNextDestinationRankApi,
} from '../../apis/taxi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../store/user';

const tempStartLat = 35.09362058403008;
const tempStartLon = 128.8556517902862;
const tempTaxiSeq = 1;

const TaxiPathSettingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const dropdownRef = useRef(null);
  const { guestSeq } = location.state || {};

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setShowDropdown(true);
  };

  const handleAddClick = () => {
    if (destination) {
      setSelectedAddress(destination);
      setIsModalOpen(true);
      setShowDropdown(false); // 선택하면 드롭다운을 닫음
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAdd = async () => {
    setLoading(true);
    try {
      // 1. 다음 목적지 순위 가져오기
      const rank = await getNextDestinationRankApi(tempTaxiSeq);

      // 2. 개인 예상 비용 계산
      const paramsForCost = {
        startLat: tempStartLat,
        startLon: tempStartLon,
        endLat: latitude,
        endLon: longitude,
      };
      const costResponse = await calculateIndividualExpectedCostApi(paramsForCost);
      const cost = costResponse.cost; // cost 변수에 값을 할당

      // 3. 택시 파티 목적지 및 비용 설정
      const paramsForDestination = {
        guestSeq,
        destiName: selectedAddress,
        destiLat: latitude,
        destiLon: longitude,
        cost,
        routeRank: rank,
      };
      await setDestinationAndCostApi(paramsForDestination);

      console.log('택시 파티 목적지 및 비용 설정 완료:', paramsForDestination);
      navigate(-1); // 완료 후 채팅방으로 이동
    } catch (error) {
      console.error('오류 발생:', error);
      // 오류 처리 (예: 오류 메시지 표시)
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          경로 설정
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col px-6 py-4">
        <div>
          <SearchDropdown
            placeholder="목적지를 입력하세요"
            label="목적지 검색"
            value={destination}
            name="destination"
            onChange={handleDestinationChange}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          {/*// 목적지 name: destination에 저장 // latitude, longitude 에 저장
           <label className="block text-sm font-bold text-gray-700 mb-2">
            목적지 검색
          </label>
          <div className="relative rounded-md">
             <input
              type="text"
              className="block w-full pr-10 py-4 px-3 shadow-md bg-neutral-100 border-gray-300 focus:outline-none focus:ring-main focus:border-main text-sm rounded-md"
              placeholder="목적지를 입력하세요"
              value={destination}
              onChange={handleDestinationChange}
            />
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={handleSearchClick} // Search 컴포넌트를 여는 클릭 핸들러
            >
              <img
                src={searchIcon}
                alt="목적지 검색"
                className="h-6 w-6 text-gray-400"
              />  </button> 
            
          </div>*/}
        </div>

        <div className="relative mt-1">
          {filteredData.map((data, index) => (
            <div
              key={index}
              className="flex items-center rounded-md justify-between p-2 bg-neutral-100 border-b border-gray-300"
            >
              <span className="text-sm">{data.address}</span>
              <button
                onClick={() => handleAddClick(data.address)}
                className="bg-gray-500 text-white text-xs ml-2 px-2 py-1 rounded-lg whitespace-nowrap"
              >
                추가
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddClick}
        className="bg-main font-bold mx-auto text-white w-24 py-2 rounded-xl">
        추가하기
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-[250px] w-full text-center">
            <div className="mb-6 ml-1 text-left font-bold">
              해당 경로를 추가하시겠습니까?
            </div>
            <div className="flex items-center justify-center mb-2">
              <FaMapMarkerAlt className="h-5 w-5 mr-2 ml-1 mb-3 text-main" />
              <span className="text-sm text-left mb-3">{selectedAddress}</span>
            </div>
            <div className="text-sm font-bold">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 w-24 py-2 rounded-xl mr-4"
                disabled={loading}
              >
                이전
              </button>
              <button
                onClick={handleConfirmAdd}
                className="bg-main text-white w-24 py-2 rounded-xl"
                disabled={loading}
              >
                {loading ? '처리 중...' : '추가하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiPathSettingPage;
