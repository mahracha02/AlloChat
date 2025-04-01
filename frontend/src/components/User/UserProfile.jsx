import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, HelpCircle } from "lucide-react";

const ProfileDropdown = ({ user, onLogout, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate avatar initials or use profile picture
  const getInitials = () => {
    if (!user?.username) return "?";
  
    const names = user.username.trim().split(" ");
    
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase(); // Prend les 2 premières lettres du seul mot
    }
  
    return (names[0][0] + (names[1]?.[0] || "")).toUpperCase(); // Prend la 1ère lettre des 2 premiers mots
  };
  
  
  // Determine background color based on username for consistent avatar colors
  const getAvatarBg = () => {
    if (!user.username) return darkMode ? "bg-indigo-700" : "bg-indigo-200";
    
    const charCode = user.username.charCodeAt(0);
    const colorIndex = charCode % 5;
    
    const colors = [
      darkMode ? "bg-indigo-600" : "bg-indigo-200",
      darkMode ? "bg-purple-600" : "bg-purple-200",
      darkMode ? "bg-cyan-600" : "bg-cyan-200",
      darkMode ? "bg-violet-600" : "bg-violet-200",
      darkMode ? "bg-blue-600" : "bg-blue-200"
    ];
    
    return colors[colorIndex];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <div
        className={`w-10 h-10 ${getAvatarBg()} rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-sm`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.profilePicture ? (
          <img 
            src={user.profilePicture} 
            alt={user.username}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className={`${darkMode ? "text-white" : "text-indigo-600"} font-bold text-sm`}>
            {getInitials()}
          </span>
        )}
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute right-0 mt-2 w-64 rounded-lg overflow-hidden shadow-lg border ${
            darkMode 
              ? "bg-gray-900 border-gray-800 text-gray-100" 
              : "bg-white border-gray-100 text-gray-800"
          } z-10 transition-all duration-200 ease-in-out`}
        >
          {/* User Info Section */}
          <div className={`p-4 ${darkMode ? "border-b border-gray-800" : "border-b border-gray-100"}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${getAvatarBg()} rounded-full flex items-center justify-center`}>
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className={`${darkMode ? "text-white" : "text-indigo-600"} font-bold`}>
                    {getInitials()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate bg-blue-200 border rounded-lg  ${darkMode ? "text-white bg-blue-200" : "text-indigo-900 bg-blue-300"}`}>
                  {user.username}
                </p>
                <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {user.email}
                </p>
                <div className={`text-xs mt-1 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                  <span className="inline-flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-1 ${darkMode ? "bg-green-400" : "bg-green-500"}`}></span>
                    En ligne
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <button className={`w-full px-4 py-2.5 text-left flex items-center hover:${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <User size={16} className="mr-2" />
              <span>Mon profil</span>
            </button>
            
            <button className={`w-full px-4 py-2.5 text-left flex items-center hover:${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <Settings size={16} className="mr-2" />
              <span>Paramètres</span>
            </button>
            
            <button className={`w-full px-4 py-2.5 text-left flex items-center hover:${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <HelpCircle size={16} className="mr-2" />
              <span>Aide</span>
            </button>
            
            <div className={`${darkMode ? "border-t border-gray-800" : "border-t border-gray-100"}`}>
              <button
                onClick={onLogout}
                className={`w-full px-4 py-2.5 text-left flex items-center hover:${darkMode ? "bg-gray-800" : "bg-gray-50"} ${darkMode ? "text-red-400" : "text-red-600"}`}
              >
                <LogOut size={16} className="mr-2" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;