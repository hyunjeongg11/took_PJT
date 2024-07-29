import React from 'react';
import taxiTookIcon from '../../assets/payment/taxiTook.png';
import isMeIcon from '../../assets/payment/isMe.png';

const CheckExpectedCost = ({ isOpen, onClose, destinations, tempUser }) => {
  if (!isOpen) return null;

  const totalCost = destinations.reduce(
    (sum, item) => sum + item.expectedCost,
    0
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-80 py-6 px-4 rounded-xl shadow-lg">
        <div className="mb-4">
          <div className="text-base font-bold flex items-center">
            <img
              src={taxiTookIcon}
              alt="택시 took 아이콘"
              className="w-14 h-14 mr-3"
            />
            <div>
              <div>총 {destinations.length}명</div>
              <div>{totalCost.toLocaleString()}원</div>
            </div>
          </div>
        </div>
        <div className="mb-4 px-2">
          {destinations.map((item, index) => (
            <div key={index} className="my-2">
              <div className="flex items-center py-2">
                <img
                  src={item.userProfileIcon}
                  alt={`${item.userName} 프로필 사진`}
                  className="w-9 h-9 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <div className="text-base font-bold flex items-center">
                    {item.userName}
                    {item.userId === tempUser.userId && (
                      <img src={isMeIcon} alt="본인" className="w-9 h-5 ml-2" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm flex flex-row mb-4">
                <div className="text-sm text-black w-full">예상금액</div>
                {item.expectedCost.toLocaleString()}
              </div>
              {index < destinations.length - 1 && (
                <div className="border-b border-dashed border-neutral-300 my-2"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 bg-neutral-400 bg-opacity-75 text-white font-bold rounded-full shadow-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckExpectedCost;
