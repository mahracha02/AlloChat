import React, { useState, useRef, useEffect } from "react";
import { Settings, Moon, Sun, Bell, HelpCircle, Users, LogOut, MessageCircle } from "lucide-react";
import AlloChatLogo from '../../assets/photos/AlloChat.png';
import SideBar from '../Layout/sideBar';

const NavItem = ({ icon: Icon, label, id, activeTab, setActiveTab }) => (
  <div
    className={`flex flex-col items-center justify-center py-4 cursor-pointer transition-colors group ${
      activeTab === id
        ? 'bg-purple-600 text-white'
        : 'hover:bg-gray-100 text-gray-600 hover:text-purple-600'
    }`}
    onClick={() => setActiveTab(id)}
  >
    {Icon && (
      <Icon
        className={`w-6 h-6 mb-1 ${
          activeTab === id
            ? 'text-white'
            : 'text-gray-500 group-hover:text-purple-600'
        }`}
      />
    )}
    <span className="text-xs">{label}</span>
  </div>
);

const NavbarVertical = ({ darkMode, activeTab, setActiveTab }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Vertical Navbar */}
      <div className={`w-22 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className="flex items-center m-2">
          <div className="flex items-center ">
            <div className="w-18 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <img src={AlloChatLogo} alt="AlloChat Logo" className="w-17 h-15 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Navigation Items */}
        <div className="flex flex-col flex-grow">
          <NavItem 
            icon={Bell} 
            label="Notifications" 
            id="notifications" 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem 
            icon={MessageCircle} 
            label="Conversations" 
            id="conversations" 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem 
            icon={Users} 
            label="Équipes" 
            id="teams" 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        
        {/* User Profile Bottom */}
        <div className="px-4 pb-4 border-t border-gray-200 relative" ref={dropdownRef}>
        <div className="pb-4 pt-4 flex justify-center">
          <div
            className={`w-10 h-10 ${darkMode ? 'bg-indigo-700' : 'bg-indigo-600'} text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-800 transition-colors`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings size={18} />
          </div>
        </div>
        
        {/* Settings dropdown menu */}
        {isSettingsOpen && (
          <div className={`absolute bottom-20 left-0 w-56 ml-4 rounded-lg shadow-lg overflow-hidden ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <SideBar darkMode={darkMode} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default NavbarVertical;
