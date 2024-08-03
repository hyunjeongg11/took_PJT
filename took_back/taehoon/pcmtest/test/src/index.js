import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if ("serviceWorker" in navigator) {
  // 이 조건문은 브라우저가 서비스 워커를 지원하는지 확인합니다.
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      // 서비스 워커 파일(firebase-messaging-sw.js)을 등록합니다.
      // 등록이 성공하면, 서비스 워커 등록 객체가 반환됩니다.
      console.log("Service Worker registered with scope:", registration.scope);
      // 서비스 워커가 성공적으로 등록되었음을 콘솔에 출력합니다.
      // registration.scope는 서비스 워커의 범위를 나타냅니다.
    })
    .catch(function (err) {
      // 서비스 워커 등록이 실패한 경우, 에러를 처리합니다.
      console.log("Service Worker registration failed:", err);
      // 서비스 워커 등록 실패 메시지를 콘솔에 출력합니다.
    });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
