import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // 서버로 로그인 요청을 보냅니다.
      const response = await axios.post("http://localhost:4040/api/v1/auth/sign-in", {
        userId,
        password,
      }, { withCredentials: true }); // 쿠키를 포함하여 요청합니다.

      // 서버에서 받은 응답에서 accessToken을 추출합니다.
      const { accessToken } = response.data;

      // 로컬 스토리지에 accessToken을 저장합니다.
      localStorage.setItem("accessToken", accessToken);

      // 상태를 업데이트하고, 에러 메시지를 지웁니다.
      setAccessToken(accessToken);
      setError("");
      console.log("Access Token:", accessToken);

    } catch (err) {
      // 에러가 발생하면 에러 메시지를 상태에 저장합니다.
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {accessToken && <p style={{ color: "green" }}>Login successful! Access Token: {accessToken}</p>}
    </div>
  );
};

export default SignIn;
