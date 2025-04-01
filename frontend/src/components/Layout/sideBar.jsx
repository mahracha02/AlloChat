import React, { useState } from "react";
import { 
  Monitor, 
  User, 
  MessageCircle, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { motion } from "framer-motion"; // Ensure framer-motion is imported

const Sidebar = ({ darkMode }) => {
  const [activeItem, setActiveItem] = useState("general");

  const menuItems = [
    { id: "general", icon: <Monitor size={20} />, label: "Général" },
    { id: "account", icon: <User size={20} />, label: "Compte" },
    { id: "discussions", icon: <MessageCircle size={20} />, label: "Discussions" },
    { id: "help", icon: <HelpCircle size={20} />, label: "Assistance" },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex`}
    >
      <div className={`flex h-full  ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        {/* Sidebar */}
        <div className={`w-64 h-full ${darkMode ? "bg-gray-800" : "bg-white"} flex flex-col`}>
          <div className="flex-1 overflow-y-auto">
            <nav className="py-2">
              {menuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="relative"
                  onClick={() => setActiveItem(item.id)}
                >
                  {activeItem === item.id && (
                    <div 
                      className="absolute left-0 top-0 w-1 h-full bg-green-500 transition-all duration-300"
                    />
                  )}
                  <div
                    className={`flex items-center px-6 py-3 transition-all duration-200 cursor-pointer ${
                      activeItem === item.id 
                        ? darkMode 
                          ? "bg-gray-700 text-white" 
                          : "bg-gray-100 text-gray-900"
                        : darkMode 
                          ? "text-gray-300 hover:bg-gray-700" 
                          : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`mr-4 ${
                      activeItem === item.id 
                        ? "text-green-500" 
                        : darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </div>
              ))}
            </nav>
          </div>
          
          {/* Profile section at bottom */}
          <div 
            className={`p-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div
              className={`flex items-center px-2 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveItem("profile")}
            >
              {activeItem === "profile" && (
                <div className="absolute left-0 h-full bg-green-500 w-1" />
              )}
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3">
                <User size={18} />
              </div>
              <div>
                <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Profil
                </div>
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Voir ou modifier
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="flex-1 p-6">
          <div className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
            {menuItems.find(item => item.id === activeItem)?.label || "Profil"}
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"} shadow`}>
            Contenu de la section {menuItems.find(item => item.id === activeItem)?.label || "Profil"}
          </div>
          
          {activeItem === "general" && (
            <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
              <div className={`font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Options supplémentaires
              </div>
              <button className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition-colors`}>
                <div className="flex items-center">
                  <LogOut size={16} className="mr-2" />
                  <span>Déconnexion</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
