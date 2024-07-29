import React, { useState } from "react";

function RequestCard({ userName, onClose }) {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequest = () => {
    setRequestSent(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl max-w-[250px] w-full text-center">
        {!requestSent ? (
          <>
            <div className="mb-6 mt-4 text-sm">
              {userName}님께 <span className="font-dela">took</span> 정산 요청<br />
              알림 메세지를 전송할까요?
            </div>
            <div className="font-bold">
              <button onClick={onClose} className="bg-gray-200 text-gray-700 w-24 py-2 rounded-xl mr-4">취소</button>
              <button onClick={handleRequest} className="bg-main text-white w-24 py-2 rounded-xl">요청하기</button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 mt-4 text-sm">
              요청이 완료되었습니다.
            </div>
            <div className="font-bold">
              <button onClick={onClose} className="bg-main text-white w-24 py-2 rounded-xl">확인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
