import BackButton from '../../../components/common/BackButton';
import { useState } from 'react';
import getProfileImagePath from '../../../utils/getProfileImagePath';

const initialData = [{ name: '', option: '', etc: '' }];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function OrderFormPage() {
  return (
    <div className="flex flex-col pt-5 bg-white max-w-screen min-h-screen">
      <div className="flex flex-col px-5 w-full">
        <div className="flex flex-col px-5 w-full">
          <BackButton />
          <div className="mx-6 text-2xl text-main font-extrabold">
            공구 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col pt-10 pb-1 mt-6 bg-main rounded-2xl shadow-gray-400 shadow-md">
          <div className="flex flex-col px-4 text-xs text-white">
            <div className="text-lg font-bold">상품 주문 정보 등록</div>
            <hr className="text-white w-full mx-auto text-opacity-40 my-3" />
            <div className="text-sm font-semibold pl-2 pt-2 ">배송 정보</div>
            <div className="flex text-sm flex-col items-start py-3 px-5 mt-5 text-main bg-secondary rounded-xl shadow-md shadow-orange-800 font-medium">
              <label className="w-full flex justify-between items-center">
                택배사
                <input
                  type="text"
                  className="ml-4 mt-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
                />
              </label>
              <label className="w-full flex justify-between items-center mt-2">
                송장번호
                <input
                  type="number"
                  className="ml-4 mt-2 p-2 rounded-md bg-secondary text-right  focus:outline-none focus:ring-2 focus:ring-main"
                />
              </label>
            </div>

            <div className="flex items-center gap-2 justify-center p-10 overflow-x-scroll">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <img
                    key={index}
                    loading="lazy"
                    src={getProfileImagePath(getRandomNumber(1, 20))}
                    className="w-8 mx-auto mt-3 animate-semijump "
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="px-16 py-3 my-6 text-md text-center font-bold text-white bg-main rounded-xl shadow-gray-400 shadow-md cursor-pointer">
          등록하기
        </div>
      </div>
    </div>
  );
}

export default OrderFormPage;
