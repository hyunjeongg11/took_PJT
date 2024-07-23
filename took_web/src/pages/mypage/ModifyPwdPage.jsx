import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import InputButton from '../../components/signup/InputButton';
import { isValidPassword } from '../../utils/validation';

const ERROR_MESSAGES = {
  EMPTY_CURRENT_PASSWORD: '현재 비밀번호를 입력하세요.',
  INCORRECT_CURRENT_PASSWORD: '현재 비밀번호가 일치하지 않습니다.',
  EMPTY_NEW_PASSWORD: '변경할 비밀번호를 입력하세요.',
  INVALID_NEW_PASSWORD:
    '비밀번호는 최소 8자, 최대 13자, 영문자와 숫자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
};

function ModifyPwdPage() {
  const currentPwd = 'password123'; //
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [errors, setErrors] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const validateFields = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (current === '') {
      newErrors.current = ERROR_MESSAGES.EMPTY_CURRENT_PASSWORD;
      isValid = false;
    } else if (current !== currentPwd) {
      newErrors.current = ERROR_MESSAGES.INCORRECT_CURRENT_PASSWORD;
      isValid = false;
    } else {
      newErrors.current = '';
    }

    if (newPwd === '') {
      newErrors.new = ERROR_MESSAGES.EMPTY_NEW_PASSWORD;
      isValid = false;
    } else if (!isValidPassword(newPwd)) {
      newErrors.new = ERROR_MESSAGES.INVALID_NEW_PASSWORD;
      isValid = false;
    } else {
      newErrors.new = '';
    }

    if (confirmPwd !== newPwd) {
      newErrors.confirm = ERROR_MESSAGES.PASSWORD_MISMATCH;
      isValid = false;
    } else {
      newErrors.confirm = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleModifyClick = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log('비밀번호 변경');
    }
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto">
      <header className="flex items-center px-4 py-3">
        <BackButton />
        <h1 className="mt-2 flex-grow text-center text-lg font-bold text-black">
          비밀번호 변경
        </h1>
      </header>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[1px]" />

      <main className="flex flex-col px-16 py-10 mt-3 w-full gap-5">
        <InputButton
          label="현재 비밀번호"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="현재 비밀번호를 입력해주세요"
          error={errors.current}
        />

        <InputButton
          label="새 비밀번호"
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          placeholder="새 비밀번호를 입력해주세요"
          error={errors.new}
        />

        <InputButton
          label="비밀번호 확인"
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          error={errors.confirm}
        />
      </main>
      <footer className="flex justify-center mb-6 px-16">
        <button
          className="w-full bg-main text-white font-bold text-lg py-2 mt-8 rounded-2xl shadow-md focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleModifyClick}
        >
          비밀번호 변경
        </button>
      </footer>
    </div>
  );
}

export default ModifyPwdPage;
