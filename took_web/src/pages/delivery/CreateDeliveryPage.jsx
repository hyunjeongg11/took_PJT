import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { writeDeliveryApi, modifyDeliveryApi, getDeliveryDetailApi } from '../../apis/delivery';
import { useUser } from '../../store/user';

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  min,
}) => (
  <div>
    <div className="text-base font-bold leading-8 text-neutral-600">
      {label}
    </div>
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
      {type === 'text' && (
        <button className="text-white bg-neutral-400/75 mb-1 px-3 py-1.5 rounded-full text-sm font-bold ml-2">
          검색
        </button>
      )}
      {type === 'number' && <span className="text-neutral-600 ml-2">원</span>}
    </div>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex-grow">
    <div className="text-base font-bold leading-5 text-neutral-600">
      {label}
    </div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent py-2 placeholder-gray-300 focus:outline-none focus:border-[#FF7F50] resize-none w-full h-32" // 높이 조정
    />
  </div>
);

const Modal = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
        <div className="text-base font-bold mb-2">안내</div>
        <div className="mb-4 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <div className="text-base mb-4">{message}</div>
        <div className="flex justify-center">
          <button
            className="bg-gray-200 font-bold text-[#3D3D3D] px-10 py-2 rounded-2xl mx-2"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="bg-main font-bold text-white px-10 py-2 rounded-2xl mx-2"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

function CreateDeliveryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { seq: userSeq } = useUser(); // useUser 훅을 사용하여 seq 값을 가져옵니다.
  const [form, setForm] = useState({
    storeName: '',
    deliveryAddress: '',
    deliveryTip: '',
    orderTime: '',
    additionalInfo: '',
  });

  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await getDeliveryDetailApi(id);
          setForm({
            storeName: response.storeName,
            deliveryAddress: response.pickupPlace,
            deliveryTip: response.deliveryTip,
            orderTime: response.deliveryTime,
            additionalInfo: response.content,
          });
        } catch (error) {
          console.error('배달 글 조회 중 오류 발생:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBackClick = () => {
    if (Object.values(form).some((field) => field !== '')) {
      setShowModal(true);
    } else {
      navigate(-1);
    }
  };

  const handleConfirmExit = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleSubmit = async () => { // async 추가
    if (Object.values(form).some((field) => field === '')) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 메시지 숨김
    } else {
      const params = {
        userSeq,
        roomSeq: 39, // roomSeq를 실제 값으로 대체해야 합니다.
        storeName: form.storeName,
        pickupPlace: form.deliveryAddress,
        pickupLat: 0.0, // 픽업 장소 위도 값을 실제 값으로 대체해야 합니다.
        pickupLon: 0.0, // 픽업 장소 경도 값을 실제 값으로 대체해야 합니다.
        deliveryTip: form.deliveryTip,
        deliveryTime: form.orderTime,
        content: form.additionalInfo,
      };

      try {
        let response;
        if (id) {
          await modifyDeliveryApi({ deliverySeq: id, ...params });
        } else {
          response = await writeDeliveryApi(params);
          console.log('API response:', response);
          const deliverySeq = response.deliverySeq; // 응답에서 deliverySeq를 가져옴
          navigate(`/delivery/detail/${deliverySeq}`); // 생성된 게시물로 이동
        }
        setShowCompletionMessage(true);
        setTimeout(() => {
          setShowCompletionMessage(false);
          navigate(id ? `/delivery/detail/${id}` : `/delivery/detail/${response.deliverySeq}`); // 생성된 게시물로 이동
        }, 2000); // 2초 후에 완료 메시지 사라짐
      } catch (error) {
        console.error('배달 글 작성 중 오류 발생:', error);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 메시지 숨김
      }
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <button onClick={handleBackClick}>
          <BackButton />
        </button>
        <div className="mt-2 ml-12 flex-grow text-center text-lg font-bold text-black">
          배달 <span className="font-dela">took</span> {id ? '수정하기' : '작성하기'}
        </div>
        <button
          className="text-white mt-2 bg-[#FF7F50] px-3 py-1.5 rounded-full text-sm font-bold"
          onClick={handleSubmit}
        >
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
          label="예상 배달팁"
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
            배달 <span className="font-dela">took</span> {id ? '수정 완료' : '작성 완료'}
          </div>
        </div>
      )}

      <Modal
        show={showModal}
        message="작성 중인 글쓰기를 종료하시겠습니까?"
        onConfirm={handleConfirmExit}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default CreateDeliveryPage;
