import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdBackspace } from 'react-icons/md';
import { msgToAndroid } from '../../android/message';
import { checkEasyPasswordApi } from '../../apis/account/oneclick';
import { useUser } from '../../store/user'; // 로그인한 사용자 정보를 가져오는 훅



function PwdPage() {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();

  const correctPassword = '123456'; // 지금은 기본 비밀번호 "123456"으로 설정
  //todo 사용자 간편비밀번호 체크 로직 추가해야댐

  const handleButtonClick = (value) => {
    if (input.length < 6) {
      setInput(input + value);
    }
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const handleInputChange = () => {
    if (input.length === 6) {
      console.log(input); // 최종 입력된 비밀번호 콘솔에 출력
      if (input === correctPassword) {
        alert('비밀번호가 맞습니다!');
        msgToAndroid('비밀번호가 맞습니다');
        setInput('');
        setIsError(false);
        setAttemptCount(0); // 성공 시 시도 횟수 초기화
      } else {
        setIsError(true);
        setAttemptCount((prev) => prev + 1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    window.onAuthenticate = (success) => {
      if (success) {
          alert('생체 인증 성공');
          msgToAndroid('생체 인증 성공');
          setInput('');
          setIsError(false);
          setAttemptCount(0); // 성공 시 시도 횟수 초기화
        
      } else {
        alert('생체 인증 실패');
      }
    };

    if (window.Android) {
      window.Android.authenticate();
    }
  }, []);

  useEffect(() => {
    handleInputChange();
  }, [input]);

  useEffect(() => {
    if (attemptCount >= 5) {
      alert('비밀번호 입력 횟수 초과!');
      msgToAndroid('비밀번호 입력 횟수 초과!');
      // 추가적인 처리 (예: 화면 전환, 잠금 등)
    }
  }, [attemptCount]);

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <span
          key={i}
          className={`text-2xl mx-1 ${i < input.length ? 'text-white' : 'text-gray-400'}`}
        >
          ●
        </span>
      );
    }
    return dots;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FF7F50] font-[Nanum_Gothic] relative">
      <div className="w-full flex justify-center items-center px-5 relative">
        <div className="font-dela text-4xl text-white mb-5 text-center">
          took!
        </div>
        <div
          className="absolute right-5 top-[-20px] cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 00-1.41 1.41L10.59 12l-4.89 4.88a1 1 0 001.41 1.41L12 13.41l4.89 4.88a1 1 0 001.41-1.41L13.41 12l4.89-4.88a1 1 0 000-1.41z" />
          </svg>
        </div>
      </div>
      <div className="text-xl text-white mb-5 text-center font-bold">
        {isError ? (
          <div>
            비밀번호가 맞지 않아요 <br /> 다시 입력해주세요{' '}
            <span className="text-black"> {attemptCount}/5</span>
          </div>
        ) : (
          '간편 비밀번호 입력'
        )}
      </div>
      <div className="flex justify-center mb-5">{renderDots()}</div>
      <div className="grid grid-cols-3 gap-5 mt-10 w-4/5">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i + 1}
            className="text-3xl py-5 text-white bg-transparent border-none cursor-pointer font-bold text-center"
            onClick={() => handleButtonClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <div className="col-span-1"></div>
        <button
          className="text-3xl py-5 text-white bg-transparent border-none cursor-pointer font-bold text-center"
          onClick={() => handleButtonClick(0)}
        >
          0
        </button>
        <button
          className="text-3xl py-5 text-white bg-transparent border-none cursor-pointer font-bold text-center ml-7"
          onClick={handleDelete}
        >
          <MdBackspace size={24} />
        </button>
      </div>
    </div>
  );
}

export default PwdPage;
