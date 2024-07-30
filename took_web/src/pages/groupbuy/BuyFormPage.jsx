import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/common/back.svg';

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
    <div className="flex flex-col pt-20 bg-white max-w-screen">
      <div className="flex flex-col px-5 w-full">
        <div className="flex gap-2 text-2xl text-main">
          <img
            loading="lazy"
            src={backIcon}
            className="shrink-0 my-auto aspect-square w-[21px]"
            onClick={() => navigate(-1)}
          />
          <div className="self-center text-2xl text-main font-extrabold">
            모집 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col px-7 pt-11 pb-20 mt-5 bg-secondary rounded-3xl shadow-gray-400 shadow-md">
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="제목"
            className="my-2 text-sm text-zinc-800 text-opacity-40 bg-secondary"
          ></input>
          <hr className="border-main border-opacity-50" />
          <input
            type="text"
            placeholder="내용을 입력하세요.."
            className="mt-5 mb-7 text-xs text-zinc-800 text-opacity-40 bg-secondary"
          ></input>
        </div>

        <div className="px-9 py-8 mt-5 bg-secondary rounded-2xl shadow-gray-400 shadow-md">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between text-sm font-semibold  text-main">
              물품명
              <input
                id="item"
                name="item"
                type="text"
                value={formData.item}
                onChange={handleChange}
                required
                placeholder="물품명을 입력하세요"
                className="text-main text-xs placeholder-gray-400 font-medium bg-secondary text-right focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between text-sm font-semibold text-main">
              구매링크
              <input
                id="site"
                name="site"
                type="text"
                value={formData.site}
                onChange={handleChange}
                required
                placeholder="구매 링크를 입력하세요"
                className="text-main text-xs placeholder-gray-400 font-medium bg-secondary text-right focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between text-sm font-semibold text-main">
              수령장소
              <input
                id="place"
                name="place"
                type="text"
                value={formData.place}
                onChange={handleChange}
                required
                placeholder="수령 장소를 입력하세요"
                className="text-main text-xs placeholder-gray-400 font-medium bg-secondary text-right focus:border-b-main"
              ></input>
            </div>
            <div className="flex justify-between text-sm font-semibold text-main">
              최대 모집 인원
              <input
                id="max_person"
                name="max_person"
                type="number"
                value={formData.max_person}
                onChange={handleChange}
                required
                placeholder="최대 모집 인원"
                className="text-main text-xs placeholder-gray-400 font-medium bg-secondary text-right focus:border-b-main"
              ></input>
            </div>
          </div>
        </div>

        <div
          onClick={handleSubmit}
          className=" px-16 py-3 mt-9 text-sm text-center font-extrabold text-white bg-main rounded-2xl shadow-gray-400 shadow-md"
        >
          공동구매 등록하기
        </div>
      </div>
    </div>
  );
}

export default BuyFormPage;
