import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 font-dela text-main">took!</h1>
      <div className="space-y-4">
        <Link to="/login" className="">
          <button className="w-full px-6 py-3 bg-main bg-opacity-90 text-white rounded hover:bg-blue-700 transition ">
            Login
          </button>
        </Link>
        <Link to="/signup" className="block w-full">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>
        <Link to="/myInfo" className="block w-full">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">
            MyInfo
          </button>
        </Link>
        <Link to="/userinfo" className="block w-full">
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition">
            User Info
          </button>
        </Link>
        
        <Link to="/complete" className="block w-full">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
           3번째 화면
          </button>
        </Link>
        <Link to="/paymentTemp" className="block w-full">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
           1번째 화면
          </button>
        </Link>
        <Link to="/pwd" className="block w-full">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">
           2번째 화면
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
