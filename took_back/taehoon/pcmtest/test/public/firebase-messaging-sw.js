// Firebase 앱과 메시징 라이브러리 import
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

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
firebase.initializeApp(firebaseConfig);

// Firebase 메시징 인스턴스 가져오기
const messaging = firebase.messaging();

// 백그라운드 메시지 수신 핸들러 설정
messaging.onBackgroundMessage(function (payload) {
  // 알림 제목과 옵션 설정
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // 브라우저 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);
});
