import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../css/dutchpay/PaymentInputPage.css';
import PaymentCard from '../../components/payment/PaymentCard';

const defaultUsers = [
  { name: '정희수', img_no: 1 },
  { name: '조현정', img_no: 1 },
  { name: '차민주', img_no: 2 },
  { name: '김태훈', img_no: 3 },
  { name: '공지환', img_no: 4 },
  { name: '이재찬', img_no: 5 },
];

function PaymentInputPage() {
  const [payments, setPayments] = useState({
    1: {
      users: defaultUsers.map((user) => ({
        ...user,
        amount: 0,
      })),
      totalAmount: 0,
    },
  });

  const swiperRef = useRef(null);

  const addNewPayment = () => {
    const newPayment = {
      users: defaultUsers.map((user) => ({
        ...user,
        amount: 0,
      })),
      totalAmount: 0,
    };
    const newPayments = {
      ...payments,
      [Object.keys(payments).length + 1]: newPayment,
    };
    setPayments(newPayments);

    setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(Object.keys(newPayments).length - 1);
      }
    }, 0); // 타임아웃을 사용하여 상태 업데이트가 완료된 후 실행
  };

  const handleDeleteUser = (paymentIndex, userIndex) => {
    const updatedPayments = { ...payments };
    updatedPayments[paymentIndex].users.splice(userIndex, 1);
    setPayments(updatedPayments);
  };

  const handleDeleteCard = (index) => {
    const updatedPayments = { ...payments };
    delete updatedPayments[index];

    // 카드 삭제 후 재정렬
    const newPayments = {};
    let newIndex = 1;
    for (const key in updatedPayments) {
      newPayments[newIndex] = updatedPayments[key];
      newIndex++;
    }

    setPayments(newPayments);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold my-3 text-main mt-5">
        정산 <span className="font-dela">took!</span>
      </h1>
      <div className="relative flex items-center text-main">
        <p className="mb-4 text-sm">정산할 금액을 입력해주세요!</p>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
        style={{ height: '400px' }}
      >
        {Object.values(payments).map((payment, index) => (
          <SwiperSlide key={index}>
            <PaymentCard
              payment={payment}
              setPayment={(updatedPayment) => {
                const updatedPayments = {
                  ...payments,
                  [index + 1]: updatedPayment,
                };
                setPayments(updatedPayments);
              }}
              onDelete={(userIndex) => handleDeleteUser(index + 1, userIndex)}
              onCardDelete={() => handleDeleteCard(index + 1)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="text-main mb-2 mt-4 pb-1 border-main border-b-[1px] text-xs"
        onClick={addNewPayment}
      >
        차수 추가하기
      </button>
      <Link to="/dutch/total">
        <button
          onClick={() => {
            console.log(payments);
          }}
          className="bg-main px-12 py-2 shadow font-bold text-white rounded-full"
        >
          정산 요청하기
        </button>
      </Link>
    </div>
  );
}

export default PaymentInputPage;
