import BackButton from '../../../components/common/BackButton';

function MyPurchaseFormPage() {
  return (
    <div className="flex flex-col pt-5 bg-white max-w-screen min-h-screen">
      <div className="flex flex-col px-5 w-full ">
        <div className="flex flex-col px-5 w-full ">
          <BackButton />
          <div className="mx-6 text-2xl text-main font-extrabold">
            공구 <span className="font-dela">took !</span>
          </div>
        </div>
        <div className="flex flex-col pt-10 pb-7 mt-6 font-bold bg-main rounded-2xl shadow-gray-400 shadow-md">
          <div className="flex flex-col px-4 text-xs text-white">
            <div className="text-base font-extrabold">내 구매 정보 등록</div>
            <div className="flex flex-col items-start py-5 pr-20 pl-5 mt-5 text-orange-400 whitespace-nowrap bg-secondary rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <div>물품명</div>
              <div className="mt-8">선택옵션</div>
              <div className="mt-8">기타사항</div>
            </div>
            <div className="flex flex-col items-start py-5 pr-20 pl-5 mt-3.5 text-orange-400 whitespace-nowrap bg-secondary rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
              <div>물품명</div>
              <div className="mt-8">선택옵션</div>
              <div className="mt-8">기타사항</div>
            </div>
            <div className="self-center mt-4 text-xs">상품 추가하기</div>
          </div>
          <div className="self-center px-5 py-4 mt-9 max-w-full text-sm text-main bg-secondary rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[296px]">
            총 금액
          </div>
        </div>
        <div className="px-16 py-3 mt-4 text-sm text-center font-extrabold text-white whitespace-nowrap bg-main rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          등록하기
        </div>
      </div>
    </div>
  );
}

export default MyPurchaseFormPage;
