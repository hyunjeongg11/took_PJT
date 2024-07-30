import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalculatorModal = ({ onClose, tempMember }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);

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

  const currentUser = tempMember.find(member => member.user_seq === 1); // 현재 사용자의 user_seq를 1로 설정

  const handleRequestClick = () => {
    setShowRequestModal(true);
    setTimeout(() => {
      setShowRequestModal(false);
    }, 2000); // 2초 후에 모달을 닫음
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-sm">
          <h2 className="text-[14px] font-bold mb-5 ml-2 mt-2">정산</h2>
          <ul className='text-sm ml-2 mb-3'>
            {currentUser.is_leader && (
              <li className="mb-5 cursor-pointer" onClick={handleRequestClick}>정산 요청하기</li>
            )}
            <li className="cursor-pointer" onClick={() => navigate('/tookdetails')}>정산 현황보기</li>
          </ul>
        </div>
      </div>
      {showRequestModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-sm">
            <h2 className="text-[14px] font-bold mb-5 ml-2 mt-2">요청이 완료되었습니다</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default CalculatorModal;
