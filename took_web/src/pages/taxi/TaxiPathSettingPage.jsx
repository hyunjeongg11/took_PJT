import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // react-icons의 FaMapMarkerAlt 아이콘 사용
import BackButton from '../../components/common/BackButton';
import searchIcon from '../../assets/taxi/search.png';
import SearchDropdown from '../../components/map/SearchDropDown';

const TaxiPathSettingPage = () => {
  const [destination, setDestination] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [searchPageOpen, setSearchPageOpen] = useState(false); // Search 컴포넌트와 관련된 상태

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // 필터링된 데이터 상태 업데이트
    // 원본 데이터는 예시로 넣어두었으며, 실제 데이터로 대체 필요
    const filtered = tempData.filter((data) => data.address.includes(value));
    setFilteredData(filtered);
  };

  const handleAddClick = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAdd = () => {
    console.log('추가된 주소:', selectedAddress);
    setIsModalOpen(false);
  };

  const handleSearchClick = () => {
    // Search 컴포넌트를 열기 위한 상태 변경
    setSearchPageOpen(true);
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          경로 설정
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

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
               // 목적지 name: destination에 저장
               // latitude, longitude 에 저장
         {/* <label className="block text-sm font-bold text-gray-700 mb-2">
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

      {searchPageOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50">
          <button
            className="absolute top-2 right-2 text-black"
            onClick={() => setSearchPageOpen(false)}
          >
            X
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-[250px] w-full text-center">
            <div className="mb-6 text-left font-bold">
              해당 경로를 추가하시겠습니까?
            </div>
            <div className="flex items-center justify-center mb-4">
              <FaMapMarkerAlt className="h-9 w-9 mr-2 ml-1 mb-5 text-main" />
              <span className="text-sm text-left ml-2 mb-3">
                {selectedAddress}
              </span>
            </div>
            <div className="">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-700 w-24 py-2 rounded-xl mr-4"
              >
                이전
              </button>
              <button
                onClick={handleConfirmAdd}
                className="bg-main text-white w-24 py-2 rounded-xl"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxiPathSettingPage;
