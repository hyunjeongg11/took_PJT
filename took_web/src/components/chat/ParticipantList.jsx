// components/chat/ParticipantList.jsx
import React from 'react';
import { FaCrown, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import getProfileImagePath from '../../utils/getProfileImagePath';

const ParticipantList = ({ participants, onClose, onSignOut }) => {
  return (
    <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-white w-4/5 max-w-md h-full shadow-lg relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">참여자</h2>
          <button onClick={onClose} className="text-gray-400 focus:outline-none">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {participants.map((participant) => (
            <div key={participant.user_seq} className="flex items-center mb-4">
              <img
                src={getProfileImagePath(participant.imgNo)}
                alt={participant.userName}
                className="w-9 h-9 rounded-full"
              />
              <div className="ml-2.5 flex items-center">
                {participant.user_seq === 1 && (
                  <div className="bg-gray-400 text-white text-[9px] rounded-full px-1 py-0.5 mr-1">나</div>
                )}
                <div className="text-sm font-medium">{participant.userName}</div>
                {participant.is_leader && <FaCrown className="text-yellow-400 ml-2" />}
              </div>
            </div>
          ))}
        </div>
      
        <button
          onClick={onSignOut}
          className="absolute left-4 bottom-4 text-gray-400 focus:outline-none flex items-center"
        >
          <FaSignOutAlt className="w-5 h-5 mr-1" />
          {/* <span className="text-sm">나가기</span> */}
        </button>
      </div>
    </div>
  );
};

export default ParticipantList;
