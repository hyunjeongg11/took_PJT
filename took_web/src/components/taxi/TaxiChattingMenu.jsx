import React, { useState, useEffect } from 'react';
import { FaLocationDot, FaCrown } from 'react-icons/fa6';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { getUserInfoApi } from '../../apis/user';
import { useUser } from '../../store/user';

const TaxiChattingMenu = ({
  members,
  taxiParty,
  taxiStatus,
  handleMenuToggle,
  handleKickMember,
  handleLeaveChatting,
  handleChatSetting,
}) => {
  const { seq: currentUserSeq } = useUser(); // 현재 로그인한 유저의 seq 가져오기
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    const fetchUserInfos = async () => {
      const userInfoPromises = members.map(async (member) => {
        const userInfo = await getUserInfoApi({ userSeq: member.userSeq });
        return { userSeq: member.userSeq, userName: userInfo.userName };
      });

      const resolvedUserInfos = await Promise.all(userInfoPromises);
      const userInfoMap = resolvedUserInfos.reduce((acc, userInfo) => {
        acc[userInfo.userSeq] = userInfo.userName;
        return acc;
      }, {});

      setUserInfos(userInfoMap);
    };

    fetchUserInfos();
  }, [members]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-4/5 h-full bg-white shadow-md p-4 relative">
        <button
          onClick={handleMenuToggle}
          className="text-gray-400 focus:outline-none absolute top-5 right-4"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <div className="text-base font-bold mt-6 ml-1 mb-4">경로</div>
        <ul>
          {members.map((member) => (
            <li
              key={member.userSeq}
              className="flex items-center justify-between mb-2 py-1"
            >
              <div className="items-center flex flex-row text-sm text-black">
                <FaLocationDot className="mr-1 w-4 h-4 text-neutral-300" />
                <span className="px-2">{member.destiName}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <h2 className="text-base font-bold mt-6 mb-4 ml-1">참여자</h2>
        <ul>
          {members.map((member) => (
            <li
              key={member.userSeq}
              className="flex items-center justify-between mb-2 ml-1"
            >
              <div className="flex items-center py-2">
                <img
                  src={getProfileImagePath(member.userSeq)}
                  alt={userInfos[member.userSeq] || 'Loading...'}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-sm">
                  {userInfos[member.userSeq] || 'Loading...'}
                </span>
                {currentUserSeq === member.userSeq && ( // 현재 로그인한 유저와 멤버의 userSeq 비교
                  <div className="ml-1 text-xs bg-neutral-400 px-1.5 py-1 rounded-full text-white">
                    나
                  </div>
                )}
                {taxiParty.master === member.userSeq && (
                  <FaCrown className="text-yellow-500 ml-1 w-5" />
                )}
              </div>
              {taxiParty.userSeq === taxiParty.master &&
                member.userSeq === taxiParty.master && (
                  <div className="ml-1 text-xs bg-main px-2 py-1 rounded-lg shadow-sm text-white">
                    결제자
                  </div>
                )}
              {taxiParty.userSeq === taxiParty.master &&
                member.userSeq !== taxiParty.master && (
                  <button
                    className="text-red-600 border-2 border-red-600 rounded-lg py-1 px-2 text-xs"
                    onClick={() => handleKickMember(userInfos[member.userSeq])}
                  >
                    내보내기
                  </button>
                )}
            </li>
          ))}
        </ul>
        {taxiStatus !== 'BOARD' && taxiStatus !== 'DONE' && (
          <button
            className="absolute bottom-4 left-4 text-gray-400"
            onClick={handleLeaveChatting}
          >
            <FaSignOutAlt className="w-6 h-6" />
          </button>
        )}
        {taxiParty.master === taxiParty.userSeq && (
          <button
            className="absolute bottom-4 right-4 text-gray-400"
            onClick={handleChatSetting}
          >
            <IoIosSettings className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaxiChattingMenu;
