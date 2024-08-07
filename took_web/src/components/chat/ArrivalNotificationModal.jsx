// components/chat/ArrivalNotificationModal.jsx
import React, { useEffect, useRef } from 'react';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { MdAdd } from 'react-icons/md';

const ArrivalNotificationModal = ({ members, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-main w-full max-w-md h-1/2 rounded-t-3xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-white focus:outline-none ml-auto"
          >
            <MdAdd className="rotate-45 w-6 h-6" />
          </button>
        </div>
        <h2 className="text-white text-lg font-bold text-center mt-4">
          물품이 도착했나요?
        </h2>
        <div className="flex justify-center mt-4 space-x-2">
          {members.map((member) => (
            <img
              key={member.user_seq}
              src={getProfileImagePath(member.imgNo)}
              alt={member.userName}
              className="w-12 h-12 animate-shake mt-4"
            />
          ))}
        </div>
        <p className="text-white text-center mt-6">
          공동구매 그룹원들에게
          <br />
          물품 도착 알림을 보내시겠습니까?
        </p>
        <button
          className="w-full bg-white text-main font-semibold py-2 rounded-lg mt-6"
          onClick={onClose}
        >
          알림 보내기
        </button>
      </div>
    </div>
  );
};

export default ArrivalNotificationModal;
