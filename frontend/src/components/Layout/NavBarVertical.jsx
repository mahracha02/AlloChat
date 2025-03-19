import React from 'react';
import { Bell, MessageCircle, Users } from 'lucide-react';
import AlloChatLogo from '../../assets/photos/AlloChat.png';

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
        <div className="pb-4 flex justify-center">
          <div 
            className={`w-10 h-10 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600`}
            onClick={() => alert('User Profile')}
          >
            <span className="font-bold">JD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarVertical;
