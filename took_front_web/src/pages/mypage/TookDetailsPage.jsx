import React from "react";
import BackButton from "../../components/common/BackButton";
import completeIcon from "../../assets/payment/complete.png"; // 정산 완료 아이콘 경로
import incompleteIcon from "../../assets/payment/incomplete.png"; // 정산 미완료 아이콘 경로
import deliveryIcon from "../../assets/payment/deliveryTook.png"; // 배달 took 아이콘 경로
import taxiIcon from "../../assets/payment/taxiTook.png"; // 택시 took 아이콘 경로
import userProfile1 from "../../assets/profile/img1.png"; // 사용자 프로필 아이콘 경로
import userProfile2 from "../../assets/profile/img2.png"; // 사용자 프로필 아이콘 경로
import userProfile3 from "../../assets/profile/img3.png"; // 사용자 프로필 아이콘 경로
import userProfile4 from "../../assets/profile/img4.png"; // 사용자 프로필 아이콘 경로
import isMeIcon from "../../assets/payment/isMe.png"; // 본인 아이콘 경로

const users = [
  { name: "차민주", icon: userProfile1, amount: 14150, status: "완료", orderAmount: 12900, deliveryTip: 1250, isMe: true },
  { name: "공지환", icon: userProfile2, amount: 18550, status: "완료", orderAmount: 17300, deliveryTip: 1250, isMe: false },
  { name: "조현정", icon: userProfile3, amount: 15650, status: "미완료", orderAmount: 14400, deliveryTip: 1250, isMe: false },
  { name: "이재찬", icon: userProfile4, amount: 23250, status: "완료", orderAmount: 22000, deliveryTip: 1250, isMe: false }
];

function TookDetailsPage({ type = "배달", date = "6.24 (월) 18:55" }) {
  const renderUserDetails = (user, index) => {
    const isCompleted = user.status === "완료";
    return (
      <div key={user.name} className="mb-4">
        <div className="flex items-center mb-3">
          <img src={user.icon} alt={user.name} className="w-9 h-9 mr-4" />
          <div className="flex-grow flex justify-between items-center">
            <div className="flex items-center">
              <span>{user.name}</span>
              {user.isMe && <img src={isMeIcon} alt="본인" className="ml-2 w-9.5 h-5" />}
            </div>
            <div className="text-right">
              <span>{user.amount.toLocaleString()}원</span>
              <div className={`text-sm ${isCompleted ? "text-gray-500" : "text-[#DD5555]"}`}>
                {user.status}
              </div>
            </div>
          </div>
        </div>
        {type === "배달" || type === "공동구매" ? (
          <div className="text-sm text-gray-500 mb-2">
            <div className="flex justify-between mb-2">
              <span>주문금액</span>
              <span className="font-normal">{user.orderAmount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>배달팁</span>
              <span className="font-normal">{user.deliveryTip.toLocaleString()}원</span>
            </div>
          </div>
        ) : null}
        {index < users.length - 1 && <div className="border-b border-dashed border-gray-300 my-2"></div>}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow text-center text-lg font-bold text-black">
          took 상세내역
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col mt-4 px-4 font-bold">
        <div className="bg-[#FBFBFB] p-5 rounded-xl shadow-lg border border-inherit max-h-[550px] overflow-y-scroll">
          <div className="text-gray-500 mb-4 text-sm">{date}</div>
          <div className="flex items-center mb-4">
            <img src={type === "배달" ? deliveryIcon : taxiIcon} alt="Took" className="w-14 h-14" />
            <div className="ml-4">
              <div className="text-sm text-gray-500">총 {users.length}명</div>
              <div className="text-lg font-bold">{users.reduce((acc, user) => acc + user.amount, 0).toLocaleString()}원</div>
            </div>
            <div className="ml-auto">
              <img src={users.some(user => user.status === "미완료") ? incompleteIcon : completeIcon} alt="정산 상태" className="w-17 h-16" />
            </div>
          </div>

          {users.map((user, index) => renderUserDetails(user, index))}
        </div>
      </div>
    </div>
  );
}

export default TookDetailsPage;