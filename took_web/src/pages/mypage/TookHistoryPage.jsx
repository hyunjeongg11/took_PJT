import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import { useNavigate } from 'react-router-dom';

function CreateDeliveryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    storeName: '',
    deliveryAddress: '',
    deliveryTip: '',
    orderTime: '',
    additionalInfo: '',
  });

  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (Object.values(form).some((field) => field === '')) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 메시지 숨김
    } else {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setShowCompletionMessage(false);
        navigate('/some-path'); // 등록 후 이동할 경로 설정
      }, 2000); // 2초 후에 완료 메시지 사라짐
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2 flex-grow text-center text-lg font-bold text-black">
          배달 <span className="font-dela">took</span> 작성하기
        </div>
        <button
          className="text-white bg-[#FF7F50] px-3 py-1.5 rounded-full text-sm font-bold"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-6 text-sm h-full">
        <div className="flex items-center mb-4 border-b border-gray-300">
          <input
            type="text"
            name="storeName"
            value={form.storeName}
            onChange={handleChange}
            placeholder="원하는 배달 가게 이름을 입력해주세요."
            className="flex-grow bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50]"
          />
          <button className="text-white bg-neutral-400/75 px-3 py-1.5 ml-2 mb-1 rounded-full text-sm font-bold">
            검색
          </button>
        </div>
        <div className="flex items-center mb-4 border-b border-gray-300">
          <input
            type="text"
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={handleChange}
            placeholder="배달 수령 장소를 입력해주세요."
            className="flex-grow bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50]"
          />
          <button className="text-white bg-neutral-400/75 px-3 py-1.5 ml-2 mb-1 rounded-full text-sm font-bold">
            검색
          </button>
        </div>
        <div className="border-b border-gray-300 mb-4">
          <input
            type="number"
            name="deliveryTip"
            value={form.deliveryTip}
            onChange={handleChange}
            placeholder="₩ 배달팁을 입력해주세요."
            className="bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50]"
          />
        </div>
        <div className="border-b border-gray-300 mb-4">
          <input
            type="datetime-local"
            name="orderTime"
            value={form.orderTime}
            onChange={handleChange}
            placeholder="배달 주문 시간을 입력해주세요."
            className="bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50]"
          />
        </div>
        <textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
          placeholder="배달에 관련된 정보 및 공유할 내용을 작성해주세요."
          className="bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50] resize-none flex-grow"
          rows="4"
        />
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center font-bold text-base ">
            모든 필드를 작성해주세요.
          </div>
        </div>
      )}

      {showCompletionMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center text-base font-bold">
            배달 <span className="font-dela">took</span> 작성 완료
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateDeliveryPage;
