import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {MainPage, LoginPage, PaymentPage, SignupPage, LocationSettingPage, ModifyPwdPage, MyPage, NotificationSetting, TookDetailsPage, UserInfoPage, AccountCompletePage, AccountPage, AgreementDetailPage, AgreementPage, VerificationPage, SelectPage, CompletePage, PwdPage, PaymentInputPage, UserListPage, PaymentTotalPage, PayRequestPage, TookHistoryPage } from "./pages";
import PaymentMethods from "./pages/oneclick/PaymentMethodsPage"
import MyTookMoneyPage from "./pages/oneclick/MyTookMoneyPage"
import CreateDeliveryPage from "./pages/delivery/CreateDeliveryPage"
import DeliveryDetailPage from "./pages/delivery/DeliveryDetailPage"
import DeliveryListPage from './pages/delivery/DeliveryListPage'



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
    { path: "/tookHistory", element: <TookHistoryPage /> },
    { path: "/complete", element: <CompletePage />},
    { path: "/paymentmethods", element: <PaymentMethods /> },
    { path: "/dutch/userlist", element: <UserListPage />},
    { path: "/dutch/input", element: <PaymentInputPage />},
    { path: "/dutch/total", element: <PaymentTotalPage />},
    { path: "/dutch/request", element: <PayRequestPage />},
    { path: "/mytookmoney", element: <MyTookMoneyPage />},
    { path: "/create/delivery", element: <CreateDeliveryPage />},
    { path: "/delivery/detail", element: <DeliveryDetailPage />},
    { path: "/delivery/list", element: <DeliveryListPage />},
  ]);

  return <RouterProvider router={ROUTER} />;
}

export default App;
