import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Users,
  Send,
  MoreVertical,
  UserPlus,
  Bell,
  Paperclip,
  Group,
} from "lucide-react";
import AddGroupMembers from "./AddGroupMembers";
const GroupChat = ({ darkMode }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch groups data
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/me");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setGroups(data); // Set the groups data
        }
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleHandler = () => {
    setIsToggled((prevState) => !prevState);
  };

  const createNewGroup = () => {
    if (newGroupName.trim()) {
      // Logic to create new group
      alert(`Creating new group: ${newGroupName}`);
      setNewGroupName("");
    }
  };

  const selectGroup = () => {
    console.log(selectedGroup);
  };

  return (
    <div className="flex h-screen">
      <div>
        <button onClick={selectGroup}> Click !</button>
      </div>

      {/* Groups List */}
      <div
        className={`w-1/4 p-4 border-r border-2 border-blue-800 rounded-xl mr-4 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Équipes</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => createNewGroup()}
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode
                  ? "hover:bg-white text-gray-300"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <Plus size={20} />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-opacity-10 ${
                darkMode
                  ? "hover:bg-white text-gray-300"
                  : "hover:bg-gray-200 text-gray-600"
              }`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search
            className={`absolute left-3 top-2.5 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
            size={18}
          />
          <input
            type="text"
            placeholder="Rechercher des équipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500"
                : "bg-gray-100 border-gray-300 text-black focus:ring-purple-300"
            }`}
          />
        </div>

        {/* New Group Input */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Nom du nouveau groupe"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className={`flex-1 mr-2 p-2 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500"
                : "bg-gray-100 border-gray-300 text-black focus:ring-purple-300"
            }`}
          />
          <button
            onClick={toggleHandler}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-purple-700 text-white hover:bg-purple-600"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Groups List */}
        <div className="space-y-2">
          {filteredGroups.map((group) => (
            <div
              id={group.id}
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`p-3 rounded-lg flex items-center cursor-pointer transition-all duration-300 ${
                selectedGroup?.id === group.id
                  ? darkMode
                    ? "bg-purple-900/50 ring-2 ring-purple-700"
                    : "bg-purple-100 ring-2 ring-purple-200"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  darkMode ? "bg-purple-800" : "bg-purple-100"
                }`}
              >
                <Users
                  size={20}
                  className={darkMode ? "text-purple-300" : "text-purple-600"}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {group.name}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {group.lastMessage}
                </p>
              </div>
              {group.unreadCount > 0 && (
                <div
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    darkMode
                      ? "bg-purple-700 text-white"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {group.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Group Conversation */}

      {isToggled && (
        <div className="mt-4 p-4 border border-gray-300 rounded w-full">
          <AddGroupMembers
            className="w-1/4"
            groupeName={newGroupName}
          ></AddGroupMembers>
        </div>
      )}
      <div
        className={`w-3/4 flex flex-col  ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {selectedGroup ? (
          <>
            {/* Group Header */}
            <div
              className={`p-4 flex justify-between items-center  border-6  rounded-xl ${
                darkMode
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                    darkMode ? "bg-purple-900" : "bg-purple-100"
                  }`}
                >
                  <Users
                    size={24}
                    className={darkMode ? "text-purple-300" : "text-purple-600"}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {selectedGroup.members} membres
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    darkMode
                      ? "hover:bg-white text-gray-300"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <UserPlus size={20} />
                </button>
                <button
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    darkMode
                      ? "hover:bg-white text-gray-300"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <Bell size={20} />
                </button>
                <button
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    darkMode
                      ? "hover:bg-white text-gray-300"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>

            {/* Message Input */}
            <div
              className={`p-4 border-t ${
                darkMode
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                <button
                  className={`p-2 rounded-full hover:bg-opacity-10 ${
                    darkMode
                      ? "hover:bg-white text-gray-300"
                      : "hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Envoyer un message..."
                  className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500"
                      : "bg-gray-100 border-gray-300 text-black focus:ring-purple-300"
                  }`}
                />
                <button
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "bg-purple-700 text-white hover:bg-purple-600"
                      : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p
              className={`text-xl ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Sélectionnez un groupe pour commencer à discuter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
