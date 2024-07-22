import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import {MainPage, LoginPage, PaymentPage, SignupPage, LocationSettingPage, ModifyPwdPage, MyPage, NotificationSetting, TookDetailsPage, UserInfoPage, AccountCompletePage, AccountPage, AgreementDetailPage, AgreementPage, VerificationPage, SelectPage, CompletePage, PwdPage} from "./pages";

=======
import MainPage from "./pages/MainPage"; // 메인 화면
import LoginPage from "./pages/LoginPage"; // 로그인 화면
import SignupPage from "./pages/SignupPage"; // 회원가입 화면
import PaymentPage from "./pages/PaymentPage"; // 결제 화면
import FoodPage from "./pages/FoodPage"; // 배달음식 화면
import TaxiPage from "./pages/TaxiPage"; // 택시 화면
import PurchasePage from "./pages/PurchasePage"; // 공동구매 화면
import CompletePage from "./pages/temp/CompletePage"; //
import PaymentTempPage from "./pages/temp/PaymentPage"; // 
import PwdPage from "./pages/temp/PwdPage"; // 
import  { ModifyPwdPage, MyPage, UserInfoPage, UserListPage, PaymentInputPage } from "./pages";


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
  {path: '/dutch/userlist', element: <UserListPage />},
  { path: "/dutch/input", element: <PaymentInputPage />}
]);
>>>>>>> 73617fe (feat: 더치페이 주변 사용자 화면 & 정산 정보 입력 화면 구현)

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
    { path: "/modifyPwd", element: <ModifyPwdPage /> },
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
    { path: "/accountcomplete", element: <AccountCompletePage /> }, { path: "/mypage", element: <MyPage /> },
    { path: "/notification", element: <NotificationSetting /> },
    { path: "/location", element: <LocationSettingPage /> },
    { path: "/tookDetails", element: <TookDetailsPage /> },
    { path: "/complete", element: <CompletePage />}
  ]);

  return <RouterProvider router={ROUTER} />;
}

export default App;
