import React from 'react';
import BackButton from '../../components/common/BackButton';
import { Link } from 'react-router-dom';
import { BuyCard } from '../../components/groupbuy/BuyCard';

const temp_data = [
  {
    id: 1,
    title: '마이프로틴 공동구매 모집합니다',
    site: '마이프로틴',
    item: '프로틴',
    place: '송정삼정그린코아더시티 1층',
    current_person: 4,
    max_person: 6,
    img_no: 1,
  },
  {
    id: 2,
    title: '양파 함께 구매하실 분!',
    site: '오프라인',
    item: '양파',
    place: '송정삼정그린코아더시티 1층',
    current_person: 3,
    max_person: 4,
    img_no: 2,
  },
  {
    id: 3,
    title: '마이프로틴 공동구매 모집합니다',
    site: '마이프로틴',
    item: '프로틴',
    place: '송정삼정그린코아더시티 1층',
    current_person: 4,
    max_person: 6,
    img_no: 3,
  },
  {
    id: 4,
    title: '마이프로틴 공동구매 모집합니다',
    site: '마이프로틴',
    item: '프로틴',
    place: '송정삼정그린코아더시티 1층',
    current_person: 4,
    max_person: 6,
    img_no: 4,
  },
];

function BuyListPage() {
  return (
    <div className="flex flex-col pt-5 bg-white min-w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center px-5 w-full">
        <BackButton />
        <div className="self-center mb-3 text-2xl text-main font-extrabold">
          공구 <span className="font-dela">took !</span>
        </div>
        <div className="flex flex-col p-5 mt-2.5 w-full bg-secondary shadow-md shadow-gray-300 rounded-2xl overflow-y-auto">
          {temp_data.map((buy, index) => (
            <React.Fragment key={buy.id}>
              <BuyCard
                id={buy.id}
                title={buy.title}
                site={buy.site}
                item={buy.item}
                place={buy.place}
                current_person={buy.current_person}
                max_person={buy.max_person}
                img_no={buy.img_no}
              />
              {index < temp_data.length - 1 && (
                <div className="shrink-0 my-2 border border-solid border-neutral-300 border-opacity-40" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Link to="/groupbuy/form" className="w-full">
          <button className="bg-main px-12 py-2 mt-6 w-full shadow-md shadow-gray-400 font-extrabold text-white rounded-2xl">
            공동구매 모집하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BuyListPage;
