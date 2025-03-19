import React, { useEffect, useState } from "react";
import { Sun, Moon, MessageSquare, Bell } from "lucide-react";
import ProfileDropdown from "../User/UserProfile";

const NavBarHorizontal = ({ darkMode, toggleDarkMode, onLogout, setActiveTab }) => {
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Mock unread messages count - in a real app, this would come from your backend
    setUnreadCount(3);
  }, []);
  
  return (
    <div className="flex-grow flex flex-col">
      <header
        className={`flex justify-between items-center px-4 py-2 border-b ${
          darkMode 
            ? "bg-indigo-900 border-indigo-800 text-white" 
            : "bg-white border-indigo-100 text-indigo-900"
        } shadow-sm`}
      >
        {/* Logo section */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <MessageSquare size={18} className="text-white" />
              </div>
              <div className="w-4 h-4 bg-cyan-400 rounded-full absolute -bottom-1 -right-1" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-indigo-600">Allo</span>
              <span className={darkMode ? "text-white" : "text-indigo-900"}>Chat</span>
            </span>
          </div>
        </div>
        
        {/* Center section - can be used for search or navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className={`relative rounded-full px-3 py-1 ${
            darkMode ? "bg-indigo-800" : "bg-indigo-50"
          } max-w-md w-full`}>
            <input
              type="text"
              placeholder="Search conversations..."
              className={`w-full bg-transparent outline-none ${
                darkMode ? "text-white placeholder:text-indigo-300" : "text-indigo-900 placeholder:text-indigo-400"
              }`}
            />
          </div>
        </div>
        
        {/* Actions section */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 relative transition-transform duration-200 transform hover:scale-110 hover:bg-indigo-50 dark:hover:bg-indigo-100 rounded-full"
            onClick={() => setActiveTab('notifications')}
          > 
            <Bell size={20} className={darkMode ? "text-indigo-200" : "text-indigo-600"} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? "hover:bg-indigo-800" 
                : "hover:bg-indigo-50"
            }`}
          >
            {darkMode 
              ? <Sun size={20} className="text-yellow-300" /> 
              : <Moon size={20} className="text-indigo-600" />
            }
          </button>
          
          {user ? (
            <ProfileDropdown 
              user={user} 
              onLogout={onLogout} 
              darkMode={darkMode} 
            />
          ) : (
            <div className={`flex items-center gap-2 ${darkMode ? "text-indigo-200" : "text-indigo-600"}`}>
              <button className="px-4 py-1 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
                <a href="/login" >
                  Login
                </a>   
              </button>
              <button className={`px-4 py-1 rounded-full border ${
                darkMode 
                  ? "border-indigo-400 text-indigo-200 hover:bg-indigo-800" 
                  : "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
              }`}>
                <a href="/register" >
                  Sign Up
                </a>
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBarHorizontal;