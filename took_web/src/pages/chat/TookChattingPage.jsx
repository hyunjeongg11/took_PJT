import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import tookIcon from '../../assets/chat/tookIcon.png';
import { FaArrowDown } from 'react-icons/fa';
import { formatDate, formatDateOnly, formatTime } from '../../utils/formatDate';

// todo: 송금 완료 (참여자)
// 📌{정산/택시/배달/공구} took 송금이 완료되었어요.

// - 받는 사람 : 조현정
// - 일시 : 2024. 7.24 (수) 18:50

//  송금 내역을 확인해보세요.
// <button>송금내역 보기</button>

// todo: 정산 완료 (최종 정산!!) ⇒ 이건 양식 다 통일하면 될 듯(택시 차액 플러스인 경우 제외하고)
// 📌{정산/택시/배달/공구} took 정산이 완료되었어요.  (결제자)

// - 요청 일자 : 2024. 6. 24 (월) 18:50
// - 정산금액 : 42,200원
// - 요청인원 : 4명
// - 완료인원 : 4명

// 정산현황에서 송금 내역을 확인해보세요.
// <button>정산현황 보기</button>

/* 📌 {택시} took 정산이 완료되었어요.  (참여자/차액이 플러스인 경우)

- 요청 일자 : 2024. 6. 24 (월) 18:50
- 요청인원 : 3명
- 완료인원 : 3명
---
- 선결제 금액 : 13,800원
- 실결제 금액 : 14,500원
- **차액 : + 700원**

<button>상세보기</button> */

// todo: 수령 확인 완료 (배달/공구)
// 📌 {배달/공동구매} 수령 확인이 완료되었어요. (결제자)

// 총 주문 금액
// 42,200원
// ---
// - 요청 일자 : 2024. 6. 24 (월) 18:50
// - 요청인원 : 4명
// - 완료인원 : 4명

// 정산현황에서 송금 내역을 확인해보세요.
// <button>정산현황 보기</button>
// <button>수령현황 보기</button>

// todo: 주문 금액 다 모였을 때 (배달/공구)
// 📌 {배달/공구} 주문 금액이 다 모였어요.

// - 요청 일자 : 2024. 6. 24 (월) 18:50
// - 정산금액 : 42,200원
// - 요청인원 : 4명
// - 완료인원 : 4명

// 정산현황에서 송금 내역을 확인해보세요.
// ~~아니면.. 배달 주문을 시작하세요 머 이런 식으로~~
// <button>정산현황 보기</button>

const tempData = [
  {
    category: 'dutchpay',
    requestDate: '2024-06-24 18:50:00',
    requestCount: 3,
    completeCount: 1,
    amount: 8777,
    chatTime: '2024-07-30 23:36',
  },
  {
    category: 'taxi',
    requestDate: '2024-06-24 18:50:00',
    requestCount: 3,
    completeCount: 1,
    prePaymentAmount: 13800,
    actualPaymentAmount: 14500,
    difference: -700,
    chatTime: '2024-07-30 23:36',
  },
  {
    category: 'delivery',
    requestDate: '2024-06-24 18:50:00',
    requestCount: 3,
    completeCount: 2,
    orderAmount: 13900,
    deliveryTip: 1250,
    totalAmount: 14150,
    chatTime: '2024-07-29 08:36',
  },
  {
    category: 'groupby',
    requestDate: '2024-06-24 18:50:00',
    requestCount: 3,
    completeCount: 1,
    orderAmount: 13900,
    deliveryTip: 1250,
    totalAmount: 14150,
    chatTime: '2024-07-28 19:36',
  },
];

const renderMessage = (item, handlePayment) => (
  <div key={item.chatTime} className="flex flex-row max-w-[340px] w-[340px]">
    <div className="flex space-x-2 mb-3 w-full">
      <img src={tookIcon} alt="took" className="w-9 h-9 mt-1" />
      <div className="w-full">
        <div className="font-dela text-sm mb-1 ml-1">took</div>
        <div className="flex flex-col bg-main rounded-xl shadow pt-2">
          <div className="flex items-center px-4 space-x-2">
            <div className="text-sm text-white font-bold rounded-b-lg">
              툭알림
            </div>
          </div>
          <div className="bg-white p-4 mt-2 pt-2 rounded-b-xl">
            <div className="text-black text-sm font-bold mb-2">
              {item.category === 'dutchpay' && '정산 took 송금 요청이 왔어요!'}
              {item.category === 'taxi' && '택시 took 정산 요청이 왔어요!'}
              {item.category === 'delivery' && '배달 took 정산 요청이 왔어요!'}
              {item.category === 'groupby' &&
                '공동구매 took 정산 요청이 왔어요!'}
            </div>
            <div className="text-gray-800 text-sm space-y-1">
              <div>- 요청일자: {formatDate(item.requestDate)}</div>
              <div>- 요청인원: {item.requestCount}명</div>
              <div>- 완료인원: {item.completeCount}명</div>
              <div className="space-y-1">
                {item.category === 'dutchpay' && (
                  <>
                    <hr className="my-2 border-neutral-300 border-dashed" />
                    <strong>
                      - 요청 금액: {item.amount.toLocaleString()}원
                    </strong>
                  </>
                )}
                {item.category === 'taxi' && (
                  <>
                    <hr className="my-2 border-neutral-300 border-dashed" />
                    <div>
                      - 선결제 금액: {item.prePaymentAmount.toLocaleString()}원
                    </div>
                    <div>
                      - 실결제 금액: {item.actualPaymentAmount.toLocaleString()}
                      원
                    </div>
                    <div className="font-bold">
                      - 차액: {item.difference.toLocaleString()}원
                    </div>
                  </>
                )}
                {(item.category === 'delivery' ||
                  item.category === 'groupby') && (
                  <>
                    <hr className="my-2 border-neutral-300 border-dashed" />
                    <div>- 주문금액: {item.orderAmount.toLocaleString()}원</div>
                    <div>- 배달팁: {item.deliveryTip.toLocaleString()}원</div>
                    <div className="font-bold">
                      - 합계: {item.totalAmount.toLocaleString()}원
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="mt-3 py-1.5 px-10 w-full bg-neutral-200 bg-opacity-80 text-neutral-800 text-sm font-bold rounded-xl mx-auto"
            >
              송금하기
            </button>
          </div>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mt-auto whitespace-nowrap">
        {formatTime(item.chatTime)}
      </div>
    </div>
  </div>
);

const sortedTempData = [...tempData]
  .sort((a, b) => new Date(b.chatTime) - new Date(a.chatTime))
  .reverse();

function TookChattingPage() {
  const navigate = useNavigate();
  const lastDate = useRef(null);
  const chatEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handlePayment = () => {
    navigate('/payment');
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 200
    ) {
      setShowScrollButton(false);
    } else {
      setShowScrollButton(true);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col bg-[#FFF7ED] w-full h-full mx-auto relative">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2 flex-grow text-center text-xl font-bold font-dela text-black">
          took
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col items-start space-y-4 px-2 py-2 overflow-y-auto">
        {sortedTempData.map((item, index) => {
          const showDate = lastDate.current !== formatDateOnly(item.chatTime);
          lastDate.current = formatDateOnly(item.chatTime);

          return (
            <div key={index}>
              {showDate && (
                <div className="w-1/2 text-center text-xs mx-auto py-1 bg-neutral-200 bg-opacity-70 rounded-full text-black mt-2 mb-5">
                  {formatDateOnly(item.chatTime)}
                </div>
              )}
              {renderMessage(item, handlePayment)}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {showScrollButton && (
        <button
          className="fixed bottom-10 right-5 bg-main text-white rounded-full p-2 shadow-md transition-opacity duration-300"
          onClick={scrollToBottom}
        >
          <FaArrowDown />
        </button>
      )}
    </div>
  );
}

export default TookChattingPage;
