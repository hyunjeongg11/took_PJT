import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/api/v1/auth/user-info",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        setError("Failed to fetch user info. Please try again.");
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <p>
        <strong>User ID:</strong> {userInfo.userId}
      </p>
      <p>
        <strong>User Name:</strong> {userInfo.userName}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {userInfo.phoneNumber}
      </p>
      <p>
        <strong>Birth:</strong> {userInfo.birth}
      </p>
      <p>
        <strong>Created At:</strong> {userInfo.createdAt}
      </p>
      <p>
        <strong>Login Status:</strong> {userInfo.loginStatus}
      </p>
      <p>
        <strong>Alarm:</strong> {userInfo.alarm ? "Yes" : "No"}
      </p>
      <p>
        <strong>Sido:</strong> {userInfo.sido}
      </p>
      <p>
        <strong>Gugun:</strong> {userInfo.gugun}
      </p>
      <p>
        <strong>Address:</strong> {userInfo.addr}
      </p>
      <p>
        <strong>Latitude:</strong> {userInfo.lat}
      </p>
      <p>
        <strong>Longitude:</strong> {userInfo.lng}
      </p>
      <p>
        <strong>Image No:</strong> {userInfo.imageNo}
      </p>
      <p>
        <strong>Gender:</strong> {userInfo.gender}
      </p>
      <p>
        <strong>Role:</strong> {userInfo.role}
      </p>
    </div>
  );
};

export default UserInfo;
