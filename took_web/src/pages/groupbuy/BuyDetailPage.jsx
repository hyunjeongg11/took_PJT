import React from 'react';
// import { useParams } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import getProfileImagePath from '../../utils/getProfileImagePath';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const temp_data = {
  id: 1,
  title: '마이프로틴 공동구매 모집합니다',
  site: '마이프로틴',
  item: '프로틴',
  content: `마프대란 프로틴 같이 공동구매 하실 분 구해요
            <br />
            <br />
            8만원 이상 채워서 주문하고 싶어요! 같이 쿠폰 적용해서 주문해요!!!`,
  place: '송정삼정그린코아더시티 1층',
  current_person: 4,
  max_person: 6,
  img_no: 1,
  visit: 1,
};

const BuyDetailPage = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();

  const handleJoinGroup = () => {
    navigate(`/groupbuy/join/${temp_data.id}`);
  };

  return (
    <div className="flex flex-col pt-5 bg-white max-w-screen min-h-screen">
      <div className="flex flex-col px-5 w-full ">
        <div className="flex flex-col px-5 w-full ">
          <BackButton />
          <div className="mx-6 text-2xl text-main font-extrabold">
            공구 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col p-2 mt-5 w-full bg-white rounded-3xl shadow-gray-300">
          <div className="text-md font-extrabold text-neutral-800 py-2 p-1 mt-3">
            {temp_data.title}
          </div>
          <div className="shrink-0 h-[0.5px] border border-solid border-ne border-opacity-70 my-1" />
          <div className="flex gap-5 justify-between mt-3 w-full">
            <div className="flex gap-2.5 items-start text-neutral-500">
              <img
                loading="lazy"
                src={getProfileImagePath(temp_data.img_no)}
                className="w-5 mt-1 ml-1"
              />
              <div className="flex flex-col">
                <div className="text-xs font-bold">정 희 수</div>
                <div className="text-[10px]">07/16 16:31</div>
              </div>
            </div>
            <div className="text-[10px] text-gray-500">
              조회 : {temp_data.visit}
            </div>
          </div>
          <div className="mt-9 text-sm text-zinc-800">{temp_data.content}</div>
          <div className="flex gap-2 px-5 py-5 mt-8 bg-neutral-100 text-black rounded-xl border border-collapse">
            <div className="flex flex-col justify-between text-xs gap-3 font-bold">
              <div>물품명</div>
              <div>구매링크</div>
              <div>수령장소</div>
            </div>
            <div className="self-stretch w-px border border-neutral-300 border-opacity-60" />
            <div className="flex flex-col justify-between text-xs">
              <div className="font-normal">{temp_data.item}</div>

              <Link to="https://www.myprotein.co.kr/" className="font-normal">
                <div>{temp_data.site}</div>
              </Link>
              <div className="font-normal">{temp_data.place}</div>
            </div>
          </div>
          <Link to="https://www.myprotein.co.kr/">
            <div className="p-3 mt-4 text-sm font-bold text-center border border-neutral-200 rounded-xl shadow-md">
              사이트 보러가기
            </div>
          </Link>
        </div>
        <div
          onClick={handleJoinGroup}
          className="text-center py-3 mx-8 my-5 text-base font-bold  text-white bg-main rounded-full shadow-md"
        >
          공동구매 참여하기
        </div>
      </div>
    </div>
  );
};

export default BuyDetailPage;
