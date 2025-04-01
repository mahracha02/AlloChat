import React, { useState } from 'react';
import Conversations from '../Chat/ChatWindow';
import GroupChat from '../Group/GroupChat';
import Notifications from '../Notifications/Notifications';
import MenuHorizontal from '../Layout/NavBarHorizontal';
import NavbarVertical from '../Layout/NavBarVertical';

const AlloChat = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    console.log("Déconnexion...");
    localStorage.removeItem("user"); // Supprime les infos de l'utilisateur
    window.location.reload(); // Recharge la page pour revenir à l'état déconnecté
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Vertical Navbar */}
      <div className={`w-22 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <NavbarVertical darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className={`flex justify-between items-center p-4 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} shadow-sm`}>
          <MenuHorizontal darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} setActiveTab={setActiveTab} />
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Content for Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <Notifications darkMode={darkMode} />
            </div>
          )}

          {/* Content for Conversations Tab */}
          {activeTab === 'conversations' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <Conversations darkMode={darkMode} />
            </div>
          )}

          {/* Content for Group Chat Tab */}
          {activeTab === 'teams' && (
            <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
              <GroupChat darkMode={darkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlloChat;
