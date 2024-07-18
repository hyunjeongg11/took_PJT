import {useState} from 'react';
import kakaoImage from "../assets/login/kakao.svg";
import googleImage from "../assets/login/google.png";
import backIcon from "../assets/common/back.svg";

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginClick = (e) => {
    e.preventDefault();
    console.log("id:", userName);
    console.log("pwd:", password);
    // TODO: 로그인 API 호출
  }
  return ( 
  <>
  <img
            src={backIcon}
            alt="뒤로"
            className="w-6 h-6 mr-2"
          />
    <div className="flex flex-col w-[70%] items-center justify-center min-h-screen bg-white p-4 mx-auto">

      <div className="text-main font-dela  text-4xl mb-10">took !</div>
      <div className="w-full max-w-xs">
        <div className="mb-4">
          <input
            className="appearance-none block w-full  placeholder-main text-main text-lg placeholder:text-sm placeholder:text-opacity-60 border-b-2 border-main rounded py-2 px-1 my-4 leading-tight focus:outline-none focus:bg-white focus:border-main"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="아이디"
          />
          <input
            className="appearance-none block w-full  placeholder-main text-main text-lg placeholder:text-sm placeholder:text-opacity-60 border-b-2 border-main rounded py-2 px-1 my-4 leading-tight focus:outline-none focus:bg-white focus:border-main"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-main text-white font-bold text-lg py-3 mt-8 px-4 rounded-2xl shadow-md focus:outline-none focus:shadow-outline"
          type="submit" onClick={handleLoginClick}
        >
          로그인
        </button>
        <div className="flex justify-between text-main text-sm mb-12 mt-6">
          <a href="/signup" className="hover:underline">회원가입</a>
          <a href="/userinfo" className="hover:underline">비밀번호 찾기</a>
        </div>
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-main" />
          <span className="mx-2 text-main text-sm">또는</span>
          <hr className="flex-grow border-t border-main" />
        </div>
        <button
          className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-2xl shadow-md focus:outline-none focus:shadow-outline mb-4 flex items-center justify-center"
          type="button"
        >
          <img
            src={kakaoImage}
            alt="Kakao"
            className="w-6 h-6 mr-2"
          />
          카카오로 로그인
        </button>
        <button
          className="w-full font-nanum bg-blue-500 font-bold text-white py-3  px-4 rounded-2xl shadow-md focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
        >
          <img
            src={googleImage}
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          구글로 로그인
        </button>
      </div>
    </div></>
  );
}

export default LoginPage;