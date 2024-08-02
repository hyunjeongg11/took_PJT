import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';
import { Link } from 'react-router-dom';
import { BuyCard } from '../../components/groupbuy/BuyCard';
import { getAllShopApi } from '../../apis/groupBuy/shop';
import { useUser } from '../../store/user';

function BuyListPage() {
  const { seq: userSeq } = useUser();
  const [buyList, setBuyList] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    const fetchBuyList = async () => {
      try {
        const params = [userSeq];
        const data = await getAllShopApi(params);
        if (Array.isArray(data)) {
          setBuyList(data);
        } else {
          setBuyList([]); // 응답이 배열이 아닌 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error('API call error:', error);
        setBuyList([]); // API 호출 에러 발생 시 빈 배열로 설정
      }
    };

    fetchBuyList();
  }, [userSeq]);

  return (
    <div className="flex flex-col pt-5 bg-white min-w-screen min-h-screen">
      <div className="flex flex-col items-center justify-center px-5 w-full">
        <BackButton />
        <div className="self-center mb-3 text-2xl text-main font-extrabold">
          공구 <span className="font-dela">took !</span>
        </div>
        <div className="flex flex-col p-5 mt-2.5 w-full bg-neutral-50 shadow-md rounded-2xl border border-neutral-200 overflow-y-auto">
          {buyList.map((buy, index) => (
            <React.Fragment key={buy.shopSeq}>
              <BuyCard
                id={buy.shopSeq}
                title={buy.title}
                site={buy.site}
                item={buy.item}
                place={buy.place}
                current_person={buy.current_person || 0} // 현재 인원 수를 제공하지 않는 경우 기본값 0 설정
                max_person={buy.maxCount}
                img_no={buy.imageNo || 1} // 이미지 번호를 제공하지 않는 경우 기본값 1 설정
              />
              {index < buyList.length - 1 && (
                <div className="shrink-0 my-2 border border-solid border-neutral-300 border-opacity-40" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Link to="/groupbuy/form" className="w-full">
          <button className="bg-main px-12 py-3 mb-8 mt-6 w-full shadow-sm font-bold text-white rounded-2xl">
            공동구매 모집하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BuyListPage;
