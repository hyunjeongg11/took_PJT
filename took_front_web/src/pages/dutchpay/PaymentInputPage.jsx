import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Pagination } from "swiper";
// import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.min.css";
// SwiperCore.use([Navigation, Pagination]);
function PaymentInputPage() {
    
    // const { payments, setPaymentAmount } = usePayments([
    //     { name: "정희수", img_no: 0, amount: null },
    //     { name: "조현정", img_no: 1, amount: null },
    //     { name: "차민주", img_no: 2, amount: null },
    //     { name: "김태훈", img_no: 3, amount: null },
    //     { name: "공지환", img_no: 4, amount: null },
    // ]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-4xl font-bold my-4 text-main mt-12">
                정산 <span className="font-dela">took!</span>
            </h1>
            <div className="relative flex items-center mb-4 text-main">
                <p className="mb-4 text-sm">정산할 금액을 입력해주세요!</p>
            </div>
            {/* <div className="min-h-96 bg-white"></div> */}
            <Swiper pagination={{clickable:true}} className="mySwiper">
            
                <SwiperSlide>
                    <div>
                    테스트1
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                    테스트2
                    </div>
                </SwiperSlide>
                
            </Swiper>
            
            <button className="text-main  mb-4 pb-1 border-main border-b-[1px] text-sm">차수 추가하기</button>
            <Link to="/dutch/input">
                <button className="bg-main px-12 py-2 shadow font-bold text-white rounded-full">
                    정산 요청하기
                </button>
            </Link>
        </div>
    );
}

export default PaymentInputPage;
