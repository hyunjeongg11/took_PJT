import React, { useState } from "react";
import BackButton from "../components/common/BackButton";
import { isValidEmail, isValidPassword } from "../utils/validation";
import InputButton from "../components/signup/InputButton";
import GenderInput from "../components/signup/GenderInput";
import { formatPhoneNumber, removeHyphens} from "../utils/formatPhoneNumber";
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
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthError, setBirthError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSignupClick = e => {
    e.preventDefault();
    let valid = true;

    if(email === "") {
      setEmailError("이메일을 입력해주세요.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("유효한 이메일 주소를 입력하세요.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "비밀번호는 최소 8자, 최대 13자, 영문자와 숫자를 포함해야 합니다."
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

    if(id === "") {
      setIdError("아이디를 입력해주세요.");
      valid = false;
    } else {
      setIdError("");
    }

    if(name === "") {
      setNameError("이름을 입력해주세요.");
      valid = false;
    } else {
      setNameError("");
    }

    if(birth === "") {
      setBirthError("생년월일을 입력해주세요.");
      valid = false;
    } else if (!/^\d{8}$/.test(birth)) {
      setBirthError("생년월일은 8자리 숫자로 입력해주세요.");
      valid = false;
    } else {
      setBirthError("");
    }

    if(phoneNumber === "") {
      setPhoneNumberError("휴대폰 번호를 입력해주세요.");
      valid = false;
    } else {
      setPhoneNumberError("");
    }

    if (valid) {

      console.log("아이디:", id);
      console.log("비밀번호:", password);
      console.log("비밀번호 확인:", confirmPassword);
      console.log("이름:", name);
      console.log("성별:", gender);
      console.log("이메일:", email);
      console.log("생년월일:", birth);
      console.log("휴대폰 번호:", removeHyphens(phoneNumber));

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
      
      <div className="flex flex-col px-10 mt-3 w-full">
      <InputButton
        label="이름"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
        styleClass="flex-grow" error={nameError}
      />
      <GenderInput gender={gender} setGender={setGender} />
        <div className="flex ">
          <InputButton
            label="아이디"
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="아이디를 입력해주세요"
            styleClass="flex-grow" error={idError}
          />

          <div className="justify-center ml-1 self-end p-2 text-xs font-bold tracking-normal leading-3 text-center whitespace-nowrap rounded bg-neutral-600 text-zinc-100">
            중복확인
          </div>
        </div>

        <InputButton
          label="비밀번호"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          styleClass=""
          error={passwordError}
        />
  
        <InputButton
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          error={confirmPasswordError}
        />

        <InputButton
          label="이메일"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="예: took@took.com"
          error={emailError}
        />

        <InputButton
          label="생년월일(8자리)"
          type="number"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          placeholder="예: 20010129"
          error={birthError}
        />

        <div className="flex ">
          <InputButton
            label="휴대폰 번호"
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(formatPhoneNumber(e.target.value))}
            placeholder="숫자만 입력해주세요"
            styleClass="flex-grow"
            error={phoneNumberError}
          />

          <div className="justify-center ml-1 self-end p-2 text-xs font-bold tracking-normal leading-3 text-center whitespace-nowrap rounded bg-neutral-600 text-zinc-100">
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
