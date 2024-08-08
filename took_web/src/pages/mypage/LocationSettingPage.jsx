import React, { useState }  from 'react';
import BackButton from '../../components/common/BackButton';
import NotificationIcon from '../../assets/mypage/notification.png';
import LocationIcon from '../../assets/mypage/location.png';
import SearchDropdown from '../../components/map/SearchDropDown';
import { searchPlaces } from '../../utils/map';
import {
  modifyUserLocation
} from '../../apis/user';
import { getUserSeq } from '../../utils/getUserSeq'
import { useNavigate } from 'react-router-dom';
function LocationSettingPage({
  location: initialLocation = '부산 강서구 녹산산업중로333 (송정동)',
}) {
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState(initialLocation);
  const [searchResults, setSearchResults] = useState([]);
  const [lat, setLatitude] = useState();
  const [lng, setLongitude] = useState();
  const seq = getUserSeq();  
  const navigate = useNavigate();
  // 검색어 입력 시 상태 업데이트 함수
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setLocation(e.target.value);
  };

  // 검색 실행 함수
  const handleSearch = async () => {
    if (searchInput.trim()) {
      try {
        const results = await searchPlaces(searchInput);
        setSearchResults(results);
      } catch (error) {
        console.error('검색 오류:', error);
      }
    }
  };

  const handleChangeLocation = async () => {
    // todo: 위치 변경 로직 추가
    try {
     console.log(location);
      const params = {
        userSeq: seq,
        lat: parseFloat(lat),
        lon: parseFloat(lng),
        addr: location
      };
      console.log(params);
      const response = await modifyUserLocation(params);
      console.log("위치 변경api", response);
      navigate(-1);
    } catch (error) {
      console.log('에러 발생', error);
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          위치 / 주소 설정
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col items-center mt-4 px-4">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <img
            src={NotificationIcon}
            alt="Notification"
            className="w-3.5 h-4 mr-2"
          />
          배달 took 알림을 받을 위치를 설정해주세요
        </div>

        <div className="bg-[#F3F3F3] px-4 py-5 rounded-3xl w-full flex flex-col items-center shadow-lg">
          <div className="flex items-center text-gray-800 mb-3">
            <img src={LocationIcon} alt="Location" className="w-5.5 h-7 mr-2" />
            <div className="font-bold"><SearchDropdown
          name="locationSearch"
          value={searchInput}
          onChange={handleInputChange}
          onSearch={handleSearch}
          results={searchResults}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        /></div>
          </div>
          <button
            className="text-white text-sm bg-[#A1A1A1] rounded-full font-bold px-4 py-2 shadow-md transition-shadow"
            onClick={handleChangeLocation}
          >
            변경하기
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default LocationSettingPage;
