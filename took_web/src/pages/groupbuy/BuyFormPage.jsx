import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';

function BuyFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    site: '',
    item: '',
    content: '',
    place: '',
    max_person: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic
    console.log('Form submitted:', formData);
    navigate(-1);
  };

  return (
    <div className="flex flex-col pt-5 bg-white max-w-screen">
      <div className="flex flex-col px-5 w-full">
        <div className="flex flex-col items-baseline px-5 w-full ">
          <BackButton />
          <div className="mx-6 text-2xl text-main font-extrabold">
            공구 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col px-7 pt-5 pb-20 mt-5 border border-neutral-200 bg-neutral-50 rounded-3xl shadow-md">
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="제목"
            className="my-2 text-sm text-zinc-800 bg-neutral-50 text-opacity-40"
          ></input>
          <hr className="border-neutral-400 border-opacity-50" />
          <input
            type="text"
            placeholder="내용을 입력하세요."
            className="mt-3 mb-7 text-sm text-zinc-800 bg-neutral-50 text-opacity-40 "
          ></input>
        </div>

        <div className="pl-5 pr-4 py-5 mt-5 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-md">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-normal  text-black">
              물품명
              <input
                id="item"
                name="item"
                type="text"
                value={formData.item}
                onChange={handleChange}
                required
                placeholder="물품명을 입력하세요"
                className="text-black py-2 text-xs rounded-md border border-collapse placeholder-neutral-300 font-medium text-right pr-2 focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between items-center text-sm font-normal  text-black">
              구매링크
              <input
                id="site"
                name="site"
                type="text"
                value={formData.site}
                onChange={handleChange}
                required
                placeholder="구매 링크를 입력하세요"
                className="text-black py-2 text-xs rounded-md border border-collapse placeholder-neutral-300 font-medium text-right pr-2 focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between items-center text-sm font-normal  text-black">
              수령장소
              <input
                id="place"
                name="place"
                type="text"
                value={formData.place}
                onChange={handleChange}
                required
                placeholder="수령 장소를 입력하세요"
                className="text-black py-2 text-xs rounded-md border border-collapse placeholder-neutral-300 font-medium text-right pr-2 focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between items-center text-sm font-normal  text-black">
              최대 모집 인원
              <input
                id="max_person"
                name="max_person"
                type="number"
                value={formData.max_person}
                onChange={handleChange}
                required
                placeholder="최대 모집 인원"
                className="text-black py-2 text-xs rounded-md border border-collapse placeholder-neutral-300 font-medium text-right pr-2 focus:border-b-main"
              ></input>
            </div>
          </div>
        </div>

        <div
          onClick={handleSubmit}
          className=" px-16 py-3 mt-9 text-sm text-center font-bold text-white bg-main rounded-2xl shadow-md"
        >
          공동구매 등록하기
        </div>
      </div>
    </div>
  );
}

export default BuyFormPage;
