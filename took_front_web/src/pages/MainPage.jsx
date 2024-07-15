import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Main Page</h1>
      <div className="space-y-4">
        <Link to="/login" className="block w-full">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">Login</button>
        </Link>
        <Link to="/signup" className="block w-full">
          <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition">Sign Up</button>
        </Link>
        <Link to="/userinfo" className="block w-full">
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition">User Info</button>
        </Link>
        <Link to="/payment" className="block w-full">
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition">Payment</button>
        </Link>
        <Link to="/food" className="block w-full">
          <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition">Food Order</button>
        </Link>
        <Link to="/taxi" className="block w-full">
          <button className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition">Taxi</button>
        </Link>
        <Link to="/purchase" className="block w-full">
          <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition">Group Purchase</button>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
