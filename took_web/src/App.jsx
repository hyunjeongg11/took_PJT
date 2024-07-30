import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  MainPage,
  LoginPage,
  PaymentPage,
  SignupPage,
  LocationSettingPage,
  ModifyPwdPage,
  MyPage,
  NotificationSetting,
  TookDetailsPage,
  UserInfoPage,
  AccountCompletePage,
  AccountPage,
  AgreementDetailPage,
  AgreementPage,
  VerificationPage,
  SelectPage,
  CompletePage,
  PwdPage,
  PaymentInputPage,
  UserListPage,
  PaymentTotalPage,
  PayRequestPage,
  TookHistoryPage,
  BuyListPage,
  BuyDetailPage,
  BuyJoinPage,
  BuyFormPage,
  MyPurchasePage,
  OrderFormPage,
  TotalPurchasePage,
  MyOrderFormPage,
} from './pages';

import PaymentMethods from './pages/oneclick/PaymentMethodsPage';
import MyTookMoneyPage from './pages/oneclick/MyTookMoneyPage';
import CreateDeliveryPage from './pages/delivery/CreateDeliveryPage';
import TransactionHistoryPage from './pages/oneclick/TransactionHistoryPage';
import TransactionDetailPage from './pages/oneclick/TransactionDetailPage';
import MyTookPage from './pages/oneclick/MyTookPage';
import SendInputPage from './pages/oneclick/SendInputPage';
import DeliveryDetailPage from './pages/delivery/DeliveryDetailPage';
import DeliveryListPage from './pages/delivery/DeliveryListPage';
import DeliveryPayInputPage from './pages/delivery/DeliveryPayInputPage';
import DeliveryCompletePage from './pages/delivery/DeliveryCompletePage';
import DeliveryStatusPage from './pages/delivery/DeliveryStatusPage';
import TaxiCostInputPage from './pages/taxi/TaxiCostInputPage';
import TaxiCostRequestPages from './pages/taxi/TaxiCostRequestPages';
import TaxiMainPage from './pages/taxi/TaxiMainPage';
import CreateChattingPage from './pages/taxi/CreateChattingPage';
import TaxiChattingSettingPage from './pages/taxi/TaxiChattingSettingPage';
import TaxiPathSettingPage from './pages/taxi/TaxiPathSettingPage';
import CurrentPathListPage from './pages/taxi/CurrentPathListPage';
import DeliveryChattingMainPage from './pages/chat/DeliveryChattingMainPage';
import ChattingListPage from './pages/chat/ChattingListPage';
import TookChattingPage from './pages/chat/TookChattingPage';
import GroupBuyChattingMainPage from './pages/chat/GroupBuyChattingMainPage';

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
    { path: '/', element: <MainPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/userinfo', element: <UserInfoPage /> },
    { path: '/payment', element: <PaymentPage /> },
    { path: '/modifyPwd', element: <ModifyPwdPage /> },
    { path: '/pwd', element: <PwdPage /> },
    { path: '/account', element: <AccountPage /> },
    { path: '/select', element: <SelectPage /> },
    {
      path: '/agreement',
      element: (
        <AgreementPage
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ),
    },
    {
      path: '/agreementdetail',
      element: (
        <AgreementDetailPage
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      ),
    },
    { path: '/verification', element: <VerificationPage /> },
    { path: '/accountcomplete', element: <AccountCompletePage /> },
    { path: '/mypage', element: <MyPage /> },
    { path: '/notification', element: <NotificationSetting /> },
    { path: '/location', element: <LocationSettingPage /> },
    { path: '/tookDetails', element: <TookDetailsPage /> },
    { path: '/tookHistory', element: <TookHistoryPage /> },
    { path: '/complete', element: <CompletePage /> },
    { path: '/payment-methods', element: <PaymentMethods /> },
    { path: '/transaction-history', element: <TransactionHistoryPage /> },
    { path: '/transaction-detail', element: <TransactionDetailPage /> },
    { path: '/mytook', element: <MyTookPage /> },
    { path: '/sendinput', element: <SendInputPage /> },
    { path: '/dutch/userlist', element: <UserListPage /> },
    { path: '/dutch/input', element: <PaymentInputPage /> },
    { path: '/dutch/total', element: <PaymentTotalPage /> },
    { path: '/dutch/request', element: <PayRequestPage /> },
    { path: '/mytookmoney', element: <MyTookMoneyPage /> },
    { path: '/delivery/create', element: <CreateDeliveryPage /> },
    { path: '/delivery/detail', element: <DeliveryDetailPage /> },
    { path: '/delivery/list', element: <DeliveryListPage /> },
    { path: '/delivery/input', element: <DeliveryPayInputPage /> },
    { path: '/delivery/complete', element: <DeliveryCompletePage /> },
    { path: '/delivery/status', element: <DeliveryStatusPage /> },
    { path: '/groupbuy/list', element: <BuyListPage /> },
    { path: '/groupbuy/:id', element: <BuyDetailPage /> },
    { path: '/groupbuy/join/:id', element: <BuyJoinPage /> },
    { path: '/groupbuy/form', element: <BuyFormPage /> },
    { path: '/taxi/input', element: <TaxiCostInputPage /> },
    { path: '/taxi/request', element: <TaxiCostRequestPages /> },
    { path: '/taxi/main', element: <TaxiMainPage /> },
    { path: '/taxi/create', element: <CreateChattingPage /> },
    { path: '/taxi/setting', element: <TaxiChattingSettingPage /> },
    { path: '/taxi/path', element: <TaxiPathSettingPage /> },
    { path: '/taxi/path-list', element: <CurrentPathListPage /> },
    { path: '/chat/delivery/main', element: <DeliveryChattingMainPage /> },
    { path: '/chat/groupbuy/main', element: <GroupBuyChattingMainPage /> },
    { path: '/chat/list', element: <ChattingListPage /> },
    { path: '/chat/took', element: <TookChattingPage /> },
    { path: '/groupbuy/my-purchase', element: <MyPurchasePage /> },
    { path: '/groupbuy/order', element: <OrderFormPage /> },
    { path: '/groupbuy/total/:id', element: <TotalPurchasePage /> },
    { path: '/groupbuy/my-order', element: <MyOrderFormPage /> },
  ]);

  return <RouterProvider router={ROUTER} />;
}

export default App;
