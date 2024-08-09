import React from 'react';
import { FaLocationDot, FaCrown } from 'react-icons/fa6';
import { FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import getProfileImagePath from '../../utils/getProfileImagePath';

const TaxiChattingMenu = ({
  tempMember,
  tempTaxi,
  taxiStatus,
  handleMenuToggle,
  handleKickMember,
  handleLeaveChatting,
  handleChatSetting,
}) => {
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
          {tempMember.map((member) => (
            <li
              key={member.user_seq}
              className="flex items-center justify-between mb-2 py-1"
            >
              <div className="items-center flex flex-row text-sm text-black">
                <FaLocationDot className="mr-1 w-4 h-4 text-neutral-300" />
                <span className="px-2">{member.destination}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 w-full border-0 border-solid bg-neutral-400 bg-opacity-40 border-neutral-400 border-opacity-40 min-h-[0.5px]" />

        <h2 className="text-base font-bold mt-6 mb-4 ml-1">참여자</h2>
        <ul>
          {tempMember.map((member) => (
            <li
              key={member.user_seq}
              className="flex items-center justify-between mb-2 ml-1"
            >
              <div className="flex items-center py-2">
                <img
                  src={getProfileImagePath(member.imgNo)}
                  alt={member.userName}
                  className="w-8 h-8 mr-2"
                />
                <span className="text-sm">{member.userName}</span>
                {tempTaxi.user_seq === member.user_seq && (
                  <div className="ml-1 text-xs bg-neutral-400 px-1.5 py-1 rounded-full text-white">
                    나
                  </div>
                )}
                {tempTaxi.master === member.user_seq && (
                  <FaCrown className="text-yellow-500 ml-1 w-5" />
                )}
              </div>
              {tempTaxi.user_seq === tempTaxi.payer &&
                member.user_seq === tempTaxi.payer && (
                  <div className="ml-1 text-xs bg-main px-2 py-1 rounded-lg shadow-sm text-white">
                    결제자
                  </div>
                )}
              {tempTaxi.user_seq === tempTaxi.master &&
                member.user_seq !== tempTaxi.master && (
                  <button
                    className="text-red-600 border-2 border-red-600 rounded-lg py-1 px-2 text-xs"
                    onClick={() => handleKickMember(member.userName)}
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
        {tempTaxi.master === tempTaxi.user_seq && (
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
