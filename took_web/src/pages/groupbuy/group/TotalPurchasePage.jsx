import BackButton from '../../../components/common/BackButton';
import getProfileImagePath from '../../../utils/getProfileImagePath';
import { useNavigate, useParams } from 'react-router-dom';
import { formatNumber } from "../../../utils/format"

const temp_data = [
    {
        id: 1,
        items: ["삼성 갤럭시 S23", "삼성 갤럭시 워치 5", "삼성 갤럭시 버즈 2 프로", "삼성 프리미어 프로젝터"],
        deliveryFee: 1500,
        totalAmount: 1251500,
        itemAmount: 1250000,
        userName: "정희수"
    },
    {
        id: 2,
        items: ["애플 아이폰 14", "애플 워치 시리즈 8", "애플 에어팟 프로 2", "애플 맥북 프로"],
        deliveryFee: 2000,
        totalAmount: 3502000,
        itemAmount: 3500000,
        userName: "김영희"
    },
    {
        id: 3,
        items: ["LG OLED TV", "LG 그램 노트북", "LG 사운드 바", "LG 코드제로 무선청소기"],
        deliveryFee: 2500,
        totalAmount: 4302500,
        itemAmount: 4300000,
        userName: "박철수"
    }
];

function TotalPurchasePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const totalAmountSum = temp_data.reduce((acc, cur) => acc + cur.totalAmount, 0);

    return (
        <div className="flex flex-col pt-5 bg-white max-w-screen min-h-screen">
            <div className="flex flex-col px-5 w-full">
                <div className="flex flex-col px-5 w-full">
                    <BackButton />
                    <div className="mx-6 text-2xl text-main font-extrabold">
                        공구 <span className="font-dela">took !</span>
                    </div>
                </div>
                <div className="flex flex-col py-5 pb-1 my-6 bg-main rounded-2xl shadow-gray-400 shadow-md">
                    <div className="flex flex-col px-4 text-xs text-white">
                        <div className="text-lg font-bold mt-3">전체 구매 정보</div>
                        <hr className="text-white w-full mx-auto text-opacity-40 my-3" />
                        {temp_data.map((el, idx) => (
                            <div key={idx} className="my-4">
                                <div className="flex items-center mb-2">
                                    <img
                                        loading="lazy"
                                        src={getProfileImagePath(el.id)}
                                        alt="Profile"
                                        className="w-7"
                                    />
                                    <div className="ml-2 text-sm text-white font-semibold">
                                        {el.userName}
                                    </div>
                                </div>
                                <div className="bg-secondary rounded-lg text-main p-3 shadow-md">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold">물품명</span>
                                        <div className="text-right">
                                            {el.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="text-xs">{item}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold">배달비</span>
                                        <div className="text-right">{formatNumber(el.deliveryFee)}원</div>
                                    </div>
                                    <hr className="my-2 border-main border-opacity-40" />
                                    <div className="flex justify-between">
                                        <span className="font-bold">전체 금액</span>
                                        <div className="text-right font-semibold">{formatNumber(el.totalAmount)}원</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="text-white w-[80%] my-2 mx-auto" />
                    <div className="text-white font-bold text-lg text-center px-5 py-3">총 금액 : {formatNumber(totalAmountSum)}원</div>
                </div>
            </div>
        </div>
    );
}

export default TotalPurchasePage;
