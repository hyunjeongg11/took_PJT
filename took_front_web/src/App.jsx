import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {MainPage, LoginPage, PaymentPage, SignupPage, LocationSettingPage, ModifyPwdPage, MyPage, NotificationSetting, TookDetailsPage, UserInfoPage, AccountCompletePage, AccountPage, AgreementDetailPage, AgreementPage, VerificationPage, SelectPage, CompletePage, PwdPage} from "./pages";


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
