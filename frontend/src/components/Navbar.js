import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <div className="text-2xl font-bold">CityParkPro</div>
      <div className="flex gap-4">
        <a href="/" className="text-gray-700">Home</a>
        <a href="/about" className="text-gray-700">About Us</a>
        <a href="/reviews" className="text-gray-700">Reviews</a>
        <button className="bg-blue-500 text-white px-4 py-1 rounded">Sign Up</button>
        <button className="border px-4 py-1 rounded">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

