import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
