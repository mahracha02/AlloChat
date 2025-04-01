import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const [user, setUser] = useState(localStorage.getItem("username") || "");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("username", user); // Save user to localStorage
  }, [user]);

  const handleSubmit = () => {
    localStorage.setItem("username", user); // Ensure it's saved

    alert("your username is " + user); // Pass to parent

    navigate("/chat");
  };

  return (
    <>
      <h2>Enter your name</h2>
      <input
        className="color-red w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 "
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Enter
      </button>
    </>
  );
}

export default User;
