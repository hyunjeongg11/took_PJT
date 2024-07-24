import React, { useState } from 'react';
import BackButton from "../../components/common/BackButton";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, name, value, onChange, placeholder, type = "text", min }) => (
  <div>
    <div className="text-sm font-bold leading-5 text-neutral-600">{label}</div>
    <div className="flex items-center mb-4 border-b border-gray-300">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50]"
        min={min}
      />
      {type === "text" && <button className="text-white bg-neutral-400/75 mb-1 px-3 py-1.5 rounded-full text-sm font-bold ml-2">검색</button>}
      {type === "number" && <span className="text-neutral-600 ml-2">원</span>}
    </div>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex-grow">
    <div className="text-sm font-bold leading-5 text-neutral-600">{label}</div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50] resize-none w-full h-32" // 높이 조정
    />
  </div>
);

function CreateDeliveryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    storeName: "",
    deliveryAddress: "",
    deliveryTip: "",
    orderTime: "",
    additionalInfo: ""
  });

  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (Object.values(form).some(field => field === "")) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 메시지 숨김
    } else {
      setShowCompletionMessage(true);
      setTimeout(() => {
        setShowCompletionMessage(false);
        navigate("/some-path"); // 등록 후 이동할 경로 설정
      }, 2000); // 2초 후에 완료 메시지 사라짐
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2 ml-12 flex-grow text-center text-lg font-bold text-black">
          배달 <span className="font-dela">took</span> 작성하기
        </div>
        <button className="text-white mt-2 bg-[#FF7F50] px-3 py-1.5 rounded-full text-sm font-bold" onClick={handleSubmit}>
          등록
        </button>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-6 text-sm h-full">
        <InputField
          label="배달 가게 이름"
          name="storeName"
          value={form.storeName}
          onChange={handleChange}
          placeholder="원하는 배달 가게 이름을 입력해주세요."
        />
        <InputField
          label="배달 수령 장소"
          name="deliveryAddress"
          value={form.deliveryAddress}
          onChange={handleChange}
          placeholder="배달 수령 장소를 입력해주세요."
        />
        <InputField
          label="배달 예상팁"
          name="deliveryTip"
          type="number"
          value={form.deliveryTip}
          onChange={handleChange}
          placeholder="₩ 예상 배달팁을 입력해주세요."
        />
        <InputField
          label="배달 주문 시간"
          name="orderTime"
          type="datetime-local"
          value={form.orderTime}
          onChange={handleChange}
          placeholder="배달 주문 시간을 입력해주세요."
          min={new Date().toISOString().slice(0, 16)}
        />
        <TextAreaField
          label="추가 정보"
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleChange}
          placeholder="배달에 관련된 정보 및 공유할 내용을 작성해주세요."
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
