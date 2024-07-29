import React from 'react';


const CheckExpectedCost = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-[90%] max-w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">택시 took!</div>
          <button onClick={onClose} className="text-gray-500">
            X
          </button>
        </div>
        {children}
        <button
          onClick={onClose}
          className="w-full py-2 font-bold bg-neutral-300 text-white rounded-full mt-4 mb-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CheckExpectedCost;
