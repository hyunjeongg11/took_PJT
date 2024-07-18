import React, { useState } from "react";
import BackButton from "../components/common/backButton";
import { isValidEmail, isValidPassword } from "../utils/validation";

function SignupPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(false);
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const handleSignupClick = e => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "비밀번호는 최소 8자, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      // 회원가입 로직
      console.log("아이디:", id);
      console.log("비밀번호:", password);
      console.log("비밀번호 확인:", confirmPassword);
      console.log("이름:", name);
      console.log("성별:", gender);
      console.log("이메일:", email);
      console.log("생년월일:", birth);
      console.log("휴대폰 번호:", phoneNumber);
    }
  };
  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-1 flex-grow text-center text-lg font-bold text-black">
          회원가입
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[1px]" />

      <div className="flex flex-col px-10 mt-7 w-full">
        <div className=" text-sm font-bold leading-5 text-neutral-600">
          아이디
        </div>
        <div className="flex ">
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            className="mt-1.5 text-xs leading-5 w-full text-neutral-600 text-opacity-30 border-b-2"
            placeholder="아이디를 입력해주세요"
          />
          <div className="justify-center m-2 self-end p-2 text-xs font-bold tracking-normal leading-3 text-center whitespace-nowrap rounded bg-neutral-600 text-zinc-100">
            중복확인{" "}
          </div>
        </div>
        <div className="mt-8 text-sm font-bold leading-5 text-neutral-600">
          비밀번호
        </div>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2"
          placeholder="비밀번호를 입력해주세요"
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        <div className="mt-8 text-sm font-bold leading-5 text-neutral-600">
          비밀번호 확인
        </div>

        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2"
          placeholder="비밀번호를 한 번 더 입력해주세요"
        />
        {confirmPasswordError === false && (
          <p className="text-red-500 text-xs mt-1">비밀번호를 확인해주세요.</p>
        )}
        <div className="flex justify-between">
          <div>
            <div className="mt-8 text-sm font-bold leading-5 text-neutral-600">
              이름
            </div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2"
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div>
            <div className="mt-9 text-sm font-bold leading-5 text-neutral-600">
              성별
            </div>
            <div className="mt-1.5 flex gap-4">
              <label className="flex items-center text-xs leading-5 text-neutral-600">
                <input
                  type="radio"
                  value="남"
                  checked={gender === "남"}
                  onChange={() => setGender("남")}
                  className="mr-2"
                />
                남
              </label>
              <label className="flex items-center text-xs leading-5 text-neutral-600">
                <input
                  type="radio"
                  value="여"
                  checked={gender === "여"}
                  onChange={() => setGender("여")}
                  className="mr-2"
                />
                여
              </label>
            </div>
          </div>
        </div>

        <div className="mt-9 text-sm font-bold leading-5 text-neutral-600">
          이메일
        </div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2"
          placeholder="예: took@took.com"
        />
        {emailError && (
          <p className="text-red-500 text-xs mt-1">{emailError}</p>
        )}
        <div className="mt-9 text-sm font-bold leading-5 text-neutral-600">
          생년월일(8자리)
        </div>
        <input
          type="number"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          className="mt-1.5 text-xs leading-5 text-neutral-600 text-opacity-30 border-b-2"
          placeholder="예) 20010129"
        />

        <div className="mt-9 text-sm font-bold leading-5 text-neutral-600">
          휴대폰 번호
        </div>
        <div className="flex ">
          <input
            type="number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="mt-1.5 text-xs leading-5 w-full text-neutral-600 text-opacity-30 border-b-2"
            placeholder="숫자만 입력해주세요"
          />
          <div className="justify-center m-2 self-end p-2 text-xs font-bold tracking-normal leading-3 text-center whitespace-nowrap rounded bg-neutral-600 text-zinc-100">
            인증하기
          </div>
        </div>

        <button
          className="w-full mb-6 bg-main text-white font-bold text-lg py-3 mt-8 px-4 rounded-2xl shadow-md focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSignupClick}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
