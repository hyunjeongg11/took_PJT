import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase 구성 객체
const firebaseConfig = {
  apiKey: "AIzaSyDQKQIjzY0TdZaIQ-6w2Ce-u6seEtAQ8AU",
  authDomain: "took-a85bc.firebaseapp.com",
  projectId: "took-a85bc",
  storageBucket: "took-a85bc.appspot.com",
  messagingSenderId: "433232049429",
  appId: "1:433232049429:web:79cdd7976503be8f68651c",
  measurementId: "G-MTZ9EY7LER",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
// Firebase 메시징 인스턴스 가져오기
const messaging = getMessaging(app);

// 알림 권한 요청 및 FCM 토큰 가져오기
const requestPermission = async () => {
  try {
    await Notification.requestPermission();
    const token = await getToken(messaging, {
      vapidKey:
        "BAo4_GaNsHf-QS8tXrsC5N_Qa6Yy_TWDz0rRx0vnwSgVdvaD5RvTsHNCeaW9DZbxSv6fQfaGGypgmfehDF0UBQk",
    });
    if (token) {
      console.log("FCM Token:", token); // db에 유저별로 토큰 저장
    } else {
      console.log("No registration token available.");
    }
  } catch (err) {
    console.log("FCM 에러:", err);
  }
};

const App = () => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 알림 권한 요청
    requestPermission();

    // 포그라운드 메시지 수신 핸들러 설정
    onMessage(messaging, (payload) => {
      if (payload.notification) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };
        // 브라우저 알림 표시
        new Notification(notificationTitle, notificationOptions);
      } else {
        console.log("Notification payload is missing notification data");
      }
    });
  }, []);

  return <h1>Hello World!</h1>;
};

export default App;
