import profileImage from '../../assets/profile/img1.png';
import historyIcon from '../../assets/mypage/history.svg';
import { Link } from 'react-router-dom';
function MyPage() {
  return (
    <div className="max-h-screen ">
      <div className="flex flex-col w-full text-2xl text-center text-white bg-main pt-10">
        <div className="self-center my-8 font-dela">My took !</div>
        <div className="flex z-10 flex-col  mt-0 w-full text-sm font-bold  text-neutral-700 bg-white rounded-t-3xl p-10">
          <img
            loading="lazy"
            srcSet={profileImage}
            className="self-center shadow-sm aspect-[0.93] w-[76px]"
          />
          <div className="flex gap-3 self-center mt-6 text-lgtext-center text-black whitespace-nowrap">
            <div>차민주</div>
            <Link to="/userinfo" className="mt-1">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/411b774a6c6b6a895509efb85522213199777c7a3685a8ad0d68f2cfefdbc068?"
                className="shrink-0 my-auto w-1.5 aspect-[0.6] fill-neutral-500"
              />
            </Link>
          </div>
          <div className="flex gap-5 mt-5 w-full text-black">
            <div className="flex flex-1 gap-2.5 whitespace-nowrap leading-[150%]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f90b495eb82ceb581a24dc4a5b5263e7352644b6cffba2991d8205fd74d1ca25?"
                className="shrink-0 aspect-square w-[25px]"
              />
              <div className="my-auto">툭머니</div>
            </div>
            <div className="my-auto leading-5">
              24,000<span className="">원</span>
            </div>
          </div>
          <div className="flex gap-3.5 mt-9 leading-5">
            <img
              loading="lazy"
              srcSet={historyIcon}
              className="shrink-0 aspect-square w-[25px]"
            />
            <div>
              <span className="text-base  text-neutral-700">took</span> 히스토리
            </div>
          </div>
          <div className="flex gap-4 mt-11 leading-[150%]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ceb119d2929969ae0a04e3d610a5c7109aafb408ae90c4bb67460eb8da269e?"
              className="shrink-0 w-5 aspect-square fill-main"
            />
            <div>앱푸시 알림 설정</div>
          </div>
          <div className="flex gap-4 mt-11 leading-[150%]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0f450f90003c58982276d9ccafa89c809352286aee0d7c27ed982e6ba7be2b8?"
              className="shrink-0 w-5 aspect-[0.8] fill-main"
            />
            <div className="my-auto">위치 / 주소 설정</div>
          </div>
          <div className="flex gap-3.5 mt-10 leading-[150%]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/74d47bd2a51ad5783d2c8a3e89a6ac18bf60947f76040b64710f7e2378bbf1a8?"
              className="shrink-0 aspect-square w-[21px]"
            />
            <div className="my-auto">결제수단 관리</div>
          </div>
          <div className="justify-center self-end px-3 py-2.5 mt-11 text-xs tracking-wide leading-5 text-center text-white whitespace-nowrap rounded-xl shadow-sm bg-main">
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
