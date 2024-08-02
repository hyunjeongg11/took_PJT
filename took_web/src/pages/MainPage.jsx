import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const AndroidAppInterface = () => {
    console.log('앱 함수 호출');
    if (window.Android) {
      window.Android.showToast('Hello from Javascript!');
      window.Android.performAction('data'); // 추가 액션 호출
    }
  };

  useEffect(() => {
    AndroidAppInterface();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 font-dela text-main">took!</h1>
      <div className="space-y-4">
        <Link to="/login">
          <button className="w-full px-6 py-3 bg-main bg-opacity-90 text-white rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>
        <Link to="/mypage">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Mypage
          </button>
        </Link>
        <Link to="/chat/1">
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition">
            User Info
          </button>
        </Link>
        <Link to="/account">
          <button className="w-full px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 transition">
            계좌정보등록
          </button>
        </Link>
        <Link to="/complete">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
            3번째 화면
          </button>
        </Link>
        <Link to="/paymentTemp">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
            1번째 화면
          </button>
        </Link>
        <Link to="/pwd">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
            2번째 화면
          </button>
        </Link>
        <Link to="/payment">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Payment
          </button>
        </Link>
        <Link to="/modifyPwd">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Modify Password
          </button>
        </Link>
        <Link to="/select">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Select
          </button>
        </Link>
        <Link to="/agreement">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Agreement
          </button>
        </Link>
        <Link to="/agreementdetail">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Agreement Detail
          </button>
        </Link>
        <Link to="/verification">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Verification
          </button>
        </Link>
        <Link to="/accountcomplete">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Account Complete
          </button>
        </Link>
        <Link to="/notification">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Notification
          </button>
        </Link>
        <Link to="/location">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Location Setting
          </button>
        </Link>
        <Link to="/tookDetails">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Took Details
          </button>
        </Link>
        <Link to="/tookHistory">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Took History
          </button>
        </Link>
        <Link to="/payment-methods">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Payment Methods
          </button>
        </Link>
        <Link to="/transaction-history">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Transaction History
          </button>
        </Link>
        <Link to="/transaction-detail">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Transaction Detail
          </button>
        </Link>
        <Link to="/mytook">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            My Took
          </button>
        </Link>
        <Link to="/sendinput">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Send Input
          </button>
        </Link>
        <Link to="/dutch/userlist">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            User List
          </button>
        </Link>
        <Link to="/dutch/input">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Payment Input
          </button>
        </Link>
        <Link to="/dutch/total">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Payment Total
          </button>
        </Link>
        <Link to="/dutch/request">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Pay Request
          </button>
        </Link>
        <Link to="/mytookmoney">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            My Took Money
          </button>
        </Link>
        <Link to="/delivery/create">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Create Delivery
          </button>
        </Link>
        <Link to="/delivery/detail">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery Detail
          </button>
        </Link>
        <Link to="/delivery/list">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery List
          </button>
        </Link>
        <Link to="/delivery/input">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery Pay Input
          </button>
        </Link>
        <Link to="/delivery/complete">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery Complete
          </button>
        </Link>
        <Link to="/delivery/status">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery Status
          </button>
        </Link>
        <Link to="/groupbuy/list">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Buy List
          </button>
        </Link>
        <Link to="/groupbuy/:id">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Buy Detail
          </button>
        </Link>
        <Link to="/groupbuy/join/:id">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Buy Join
          </button>
        </Link>
        <Link to="/groupbuy/form">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Buy Form
          </button>
        </Link>
        <Link to="/taxi/input">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Cost Input
          </button>
        </Link>
        <Link to="/taxi/request">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Cost Request
          </button>
        </Link>
        <Link to="/taxi/main">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Main
          </button>
        </Link>
        <Link to="/taxi/create">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Create Chatting
          </button>
        </Link>
        <Link to="/taxi/setting">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Chatting Setting
          </button>
        </Link>
        <Link to="/taxi/path">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Path Setting
          </button>
        </Link>
        <Link to="/taxi/path-list">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Current Path List
          </button>
        </Link>
        <Link to="/chat/delivery/main">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Delivery Chatting Main
          </button>
        </Link>
        <Link to="/chat/taxi/main">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Taxi Chatting Main
          </button>
        </Link>
        <Link to="/chat/list">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Chatting List
          </button>
        </Link>
        <Link to="/chat/took">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Took Chatting
          </button>
        </Link>
        <Link to="/groupbuy/my-purchase">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            My Purchase
          </button>
        </Link>
        <Link to="/groupbuy/order">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Order Form
          </button>
        </Link>
        <Link to="/groupbuy/total/:id">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Total Purchase
          </button>
        </Link>
        <Link to="/groupbuy/my-order">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            My Order Form
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
