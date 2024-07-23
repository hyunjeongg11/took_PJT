import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';
import InfoCard from '../../components/mypage/modify/InfoCard';
import { Link } from 'react-router-dom';
function UserInfoPage() {
  const [id, setId] = useState('s007kk');
  const [name, setName] = useState('정희수');
  const [birth, setBirth] = useState('20010129');
  const [phoneNumber, setPhoneNumber] = useState('01066142769');
  const [gender, setGender] = useState('남');
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2 flex-grow text-center text-lg font-bold text-black">
          회원정보 수정
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[1px]" />

      <InfoCard label="이름" name="차민주" arrow={true} url="#" />
      <hr className="mx-12 my-3 border-gray-300 " />
      <InfoCard label="휴대폰 번호" name="01066142769" arrow={true} url="#" />
      <hr className="mx-12 my-3 border-gray-300 " />
      <InfoCard label="아이디" name="s007kk" arrow={false} url="#" />
      <hr className="mx-12 my-3 border-gray-300 " />
      <InfoCard label="비밀번호 변경" name="" arrow={true} url="/modifyPwd" />
      <hr className="mx-12 my-3 border-gray-300 " />
      <InfoCard label="이메일" name="took@took.com" arrow={true} url="#" />
      <hr className="mx-12 my-3 border-gray-300 " />
    </div>
  );
}

export default UserInfoPage;
