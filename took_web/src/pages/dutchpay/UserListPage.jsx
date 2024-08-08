import React, { useEffect, useState } from 'react';
import { getUserStyle, getMyStyle } from '../../utils/getCharacterPostion';
import questionIcon from '../../assets/payment/question.svg';
import { Link } from 'react-router-dom';
import getProfileImagePath from '../../utils/getProfileImagePath';
import { getNearByUserPositionApi } from '../../apis/position/userPosition';
import { useUser } from '../../store/user';
import { usePosition } from '../../store/position';

// const res_data = [
//   { name: '정희수', img_no: 6 },
//   { name: '조현정', img_no: 1 },

//   { name: '이재찬', img_no: 5 },
//   { name: '정희수', img_no: 6 },
//   { name: '조현정', img_no: 1 },

//   { name: '이재찬', img_no: 5 },
// ];

const UserListPage = () => {
  const { seq } = useUser();
  const { latitude, longitude } = usePosition();
  const [users, setUsers] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const imageSize = Math.max(5, 40 - (users.length - 8) * 1.6);
  const fontSize = Math.max(imageSize / 3, 12);

  useEffect(() => {
    // const fetchUsers = () => {
    //   const updatedUsers = res_data.map((user) => ({
    //     ...user,
    //     selected: false,
    //   }));
    //   setUsers(updatedUsers);
    // };
    // fetchUsers();
    loadNearUsers();
  }, []);

  const loadNearUsers = async () => {
    const res = await getNearByUserPositionApi({
      userSeq: seq,
      lat: latitude,
      lon: longitude,
    });
    const updatedUsers = res.map((user) => ({
      ...user,
      seleced: false,
      name: user.userName,
      img_no: user.imageNo,
    }));
    setUsers(updatedUsers);
  };

  const handleSelect = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, idx) =>
        idx === index ? { ...user, selected: !user.selected } : user
      )
    );
  };
  const handleHelpClick = () => {
    setShowHelp(true);
    setTimeout(() => setShowHelp(false), 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-main">
      <h1 className="text-4xl font-bold my-8 text-white mt-12">
        정산 <span className="font-dela">took!</span>
      </h1>
      <div className="relative flex items-center mb-4 text-white">
        <p className="mb-0">함께 정산할 유저를 선택해주세요!</p>
        <img
          src={questionIcon}
          alt="?"
          className="ml-2 w-6 h-6 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={handleHelpClick}
        />
      </div>
      {showHelp && (
        <div className="absolute bottom-16 text-white bg-gray-500 p-2 rounded-lg shadow-lg animate-fade-in-out mx-5 ">
          근처에 위치하고 있는 앱 사용자들에게 정산 요청을 보낼 수 있어요!
        </div>
      )}
      <div className="relative w-96 h-96">
        {users.map((user, index) => {
          return (
            <div
              key={index}
              className={`absolute flex flex-col items-center cursor-pointer transition-opacity ${
                user.selected ? 'opacity-100' : 'opacity-40'
              }`}
              onClick={() => handleSelect(index)}
              style={getUserStyle(index, users.length, imageSize)}
            >
              <img
                src={getProfileImagePath(user.img_no)}
                alt={user.name}
                className={`${user.selected ? 'animate-shake' : 'animate-none'}`}
                style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
              />
              <span
                className={`mt-1 text-white `}
                style={{ fontSize: `${fontSize}px` }}
              >
                {user.name}
              </span>
            </div>
          );
        })}

        <div
          className="absolute flex flex-col items-center cursor-pointer transition-opacity"
          style={getMyStyle(imageSize - 6)}
        >
          <img
            src={getProfileImagePath(10)}
            alt="나"
            style={{
              width: `${imageSize - 6}px`,
              height: `${imageSize - 6}px`,
            }}
            className=" animate-jump"
          />
          <span className="text-xs mt-1 text-white">나</span>
        </div>
      </div>
      <Link to={{ pathname: '/dutch/input', state: { users } }}>
        <button className="bg-white px-12 py-2 shadow font-bold text-main rounded-full">
          정산하러 가기
        </button>
      </Link>
    </div>
  );
};

export default UserListPage;
