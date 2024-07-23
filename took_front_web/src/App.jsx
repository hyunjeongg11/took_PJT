import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage"; // 메인 화면
import LoginPage from "./pages/LoginPage"; // 로그인 화면
import SignupPage from "./pages/SignupPage"; // 회원가입 화면
import UserInfoPage from "./pages/mypage/UserInfoPage"; // 유저 정보 화면
import PaymentPage from "./pages/PaymentPage"; // 결제 화면
import FoodPage from "./pages/FoodPage"; // 배달음식 화면
import TaxiPage from "./pages/TaxiPage"; // 택시 화면
import PurchasePage from "./pages/PurchasePage"; // 공동구매 화면
import ModifyPwdPage from "./pages/mypage/ModifyPwdPage"; // MyInfoPage
import CompletePage from "./pages/temp/CompletePage"; //
import PaymentTempPage from "./pages/temp/PaymentPage"; // 
import PwdPage from "./pages/temp/PwdPage"; // 
import AccountPage from "./pages/AccountRegistration/AccountPage"; //계좌등록 화면
import SelectPage from "./pages/AccountRegistration/SelectPage"; //은행선택 화면
import AgreementPage from "./pages/AccountRegistration/AgreementPage"; //약관동의 화면
import AgreementDetailPage from "./pages/AccountRegistration/AgreementDetailPage"; //약관동의상세 화면
import VerificationPage from "./pages/AccountRegistration/VerificationPage"; //본인인증 화면
import AccountCompletePage from "./pages/AccountRegistration/AccountCompletePage"; //계좌등록완료 화면
import MyPage from "./pages/mypage/MyPage"; 
import Notification from "./pages/mypage/NotificationSetting"
import Location from "./pages/mypage/LocationSettingPage"
import TookDetails from "./pages/mypage/TookDetailsPage"

const ROUTER = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/userinfo", element: <UserInfoPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/food", element: <FoodPage /> },
  { path: "/taxi", element: <TaxiPage /> },
  { path: "/purchase", element: <PurchasePage /> },
  { path: "/modifyPwd", element: <ModifyPwdPage /> },
  { path: "/complete", element: <CompletePage /> },
  { path: "/paymentTemp", element: <PaymentTempPage /> },
  { path: "/pwd", element: <PwdPage /> },
  { path: "/mypage", element: <MyPage /> },
  { path: "/notification", element: <Notification /> },
  { path: "/location", element: <Location /> },
  { path: "/tookDetails", element: <TookDetails /> },
]);

function App() {
  const [checkedItems, setCheckedItems] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
    terms4: false,
    terms5: false,
    terms6: false,
  });

  const ROUTER = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/userinfo", element: <UserInfoPage /> },
    { path: "/payment", element: <PaymentPage /> },
    { path: "/food", element: <FoodPage /> },
    { path: "/taxi", element: <TaxiPage /> },
    { path: "/purchase", element: <PurchasePage /> },
    { path: "/myInfo", element: <MyInfoPage /> },
    { path: "/complete", element: <CompletePage /> },
    { path: "/paymentTemp", element: <PaymentTempPage /> },
    { path: "/pwd", element: <PwdPage /> },
    { path: "/account", element: <AccountPage /> },
    { path: "/select", element: <SelectPage /> },
    {
      path: "/agreement",
      element: <AgreementPage checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
    },
    {
      path: "/agreementdetail",
      element: <AgreementDetailPage checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
    },
    { path: "/verification", element: <VerificationPage /> },
    { path: "/accountcomplete", element: <AccountCompletePage /> },
  ]);

  return <RouterProvider router={ROUTER} />;
}

export default App;
