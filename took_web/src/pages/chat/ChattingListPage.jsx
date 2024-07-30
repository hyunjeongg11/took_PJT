import React from 'react';
import BackButton from '../../components/common/BackButton';
import taxiIcon from '../../assets/chat/taxiIcon.png';
import deliveryIcon from '../../assets/chat/deliveryIcon.png';
import buyingIcon from '../../assets/chat/buyingIcon.png';
import tookIcon from '../../assets/chat/tookIcon.png';

const tempData = [
  {
    chatCategory: 'taxi',
    chatUser: '명지',
    recentChatMessage: '정산 완료 되었습니다.',
    recentChatTime: '2024-07-30 08:58:00',
    unreadMessages: 2,
  },
  {
    chatCategory: 'delivery',
    chatUser: 'BBQ 명지점',
    recentChatMessage: '메뉴 다 넣었어요!',
    recentChatTime: '2024-07-29 18:58:00',
    unreadMessages: 1,
  },
  {
    chatCategory: 'delivery',
    chatUser: '정희수',
    recentChatMessage: '메뉴 다 정하셨나요?',
    recentChatTime: '2024-07-26 20:58:00',
    unreadMessages: 0,
  },
  {
    chatCategory: 'taxi',
    chatUser: '공지환',
    recentChatMessage: '정산 완료 되었습니다.',
    recentChatTime: '2024-07-22 08:58:00',
    unreadMessages: 0,
  },
  {
    chatCategory: 'buying',
    chatUser: '김태훈',
    recentChatMessage: '공구 사이트 공유 드리겠습니다~',
    recentChatTime: '2024-07-20 08:58:00',
    unreadMessages: 0,
  },
  {
    chatCategory: 'delivery',
    chatUser: '이재찬',
    recentChatMessage: '메뉴 다 넣었어요!',
    recentChatTime: '2024-07-14 08:58:00',
    unreadMessages: 0,
  },
  {
    chatCategory: 'took',
    chatUser: 'took',
    recentChatMessage: '최근 업데이트 세부 사항입니다.',
    recentChatTime: '2024-07-25 08:58:00',
    unreadMessages: 0,
  },
  {
    chatCategory: 'delivery',
    chatUser: '정성찬',
    recentChatMessage: '배달 예정 기간은 일주일입니다.',
    recentChatTime: '2024-07-11 08:58:00',
    unreadMessages: 0,
  },
];

function formatTime(timeString) {
  const date = new Date(timeString);
  const now = new Date();
  const diff = (now - date) / 1000 / 60; // difference in minutes

  if (diff < 1) {
    return '방금 전';
  } else if (diff < 60) {
    return `${Math.floor(diff)}분 전`;
  } else if (diff < 24 * 60) {
    return `${Math.floor(diff / 60)}시간 전`;
  } else if (diff < 7 * 24 * 60) {
    return `${Math.floor(diff / (24 * 60))}일 전`;
  } else if (diff < 30 * 24 * 60) {
    return `${Math.floor(diff / (7 * 24 * 60))}주 전`;
  } else if (diff < 12 * 30 * 24 * 60) {
    return `${Math.floor(diff / (30 * 24 * 60))}개월 전`;
  } else {
    return `${Math.floor(diff / (12 * 30 * 24 * 60))}년 전`;
  }
}

function getIcon(category) {
  switch (category) {
    case 'taxi':
      return taxiIcon;
    case 'delivery':
      return deliveryIcon;
    case 'buying':
      return buyingIcon;
    case 'took':
      return tookIcon;
    default:
      return null;
  }
}

function ChattingListPage() {
  // 최근 메시지 시간을 기준으로 내림차순 정렬
  const sortedTempData = tempData.sort((a, b) => new Date(b.recentChatTime) - new Date(a.recentChatTime));

  return (
    <div className="flex flex-col bg-white max-w-[360px] mx-auto relative h-screen">
      <div className="flex items-center px-4 py-3">
        <BackButton />
        <div className="mt-2.5 flex-grow ml-11 text-left text-xl font-bold text-main">
          툭채팅
        </div>
      </div>

      <div className="mt-2 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

      <div className="flex flex-col">
        {sortedTempData.map((chat, index) => (
          <div key={index} className="flex items-center px-6 py-4 border-b border-gray-200">
            <img src={getIcon(chat.chatCategory)} alt={chat.chatCategory} className="w-11 h-11 mr-4" />
            <div className="flex-grow">
              <div className="flex justify-between">
                <div className="text-base font-bold">{chat.chatUser}</div>
                <div className="text-xs text-gray-600">{formatTime(chat.recentChatTime)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">{chat.recentChatMessage}</div>
                {chat.unreadMessages > 0 && (
                  <div className="text-xs font-bold text-white bg-main rounded-full px-2.5 py-0.5">{chat.unreadMessages}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChattingListPage;
