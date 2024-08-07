import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import {
  getDeliveryDetailApi,
  writeNoticeApi,
  modifyNoticeApi,
} from '../../apis/delivery';
import { useUser } from '../../store/user';

function DeliveryNoticePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { seq: userSeq } = useUser();
  const [link, setLink] = useState('');
  const [linkValue, setLinkValue] = useState('');
  const [location, setLocation] = useState('');
  const [tempLocationValue, setTempLocationValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isNewNotice, setIsNewNotice] = useState(true);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        const response = await getDeliveryDetailApi(id);
        setLocation(response.pickupPlace);
        setTempLocationValue(response.pickupPlace);
        if (response.notice) {
          setLink(response.notice);
          setLinkValue(response.notice);
          setIsNewNotice(false);
        }
      } catch (error) {
        console.error('배달 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    if (id) {
      fetchDeliveryData();
    }
  }, [id]);

  const handleLinkChange = (e) => {
    setLinkValue(e.target.value);
  };

  const handleLocationChange = (e) => {
    setTempLocationValue(e.target.value);
  };

  const handleSave = async () => {
    try {
      const params = {
        deliverySeq: id,
        notice: linkValue,
      };

      if (isNewNotice) {
        await writeNoticeApi(params);
      } else {
        await modifyNoticeApi(params);
      }

      setLink(linkValue);
      setLocation(tempLocationValue);

      setModalMessage('수정이 완료되었습니다');
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 2000);
    } catch (error) {
      console.error('공지사항을 저장하는 중 오류 발생:', error);
      setModalMessage('저장 중 오류가 발생했습니다');
      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
      }, 2000);
    }
  };

  const handleComplete = () => {
    handleSave();
  };

  useEffect(() => {
    setLinkValue(link);
    setTempLocationValue(location);
  }, [link, location]);

  return (
    <div className="flex flex-col p-4 h-screen font-[Nanum_Gothic]">
      <div className="flex items-center justify-between mb-4">
        <BackButton />
        <div className="flex-grow text-center text-lg font-bold ml-5 mt-1">
          공지사항 설정
        </div>
        <button
          className="bg-main text-white font-bold px-3 py-1 rounded-xl mt-1"
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col space-y-4 mt-4">
        <div className="mb-3">
          <div className="text-base font-bold mb-2">현재 수령 장소</div>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow">
            <textarea
              className="w-full bg-transparent outline-none text-sm resize-none p-1"
              placeholder="수령 장소를 입력하세요"
              value={tempLocationValue}
              onChange={handleLocationChange}
              rows={3}
            />
            {tempLocationValue !== location && (
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded-xl whitespace-nowrap ml-2"
                onClick={() => setLocation(tempLocationValue)}
              >
                수정
              </button>
            )}
          </div>
        </div>
        <div>
          <div className="text-base font-bold mb-2">함께 주문하기 링크</div>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow">
            <input
              type="text"
              className="w-full bg-transparent outline-none text-sm p-1"
              placeholder="링크를 입력하세요"
              value={linkValue}
              onChange={handleLinkChange}
            />
            {/* {linkValue && (
              <a
                href={linkValue}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm flex-grow"
              >
                {linkValue}
              </a>
            )} */}
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-black">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryNoticePage;
