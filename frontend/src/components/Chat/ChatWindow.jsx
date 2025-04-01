import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Users,
  MoreVertical,
  Send,
  Paperclip,
  PhoneCall,
  Video,
  UserPlus,
  Smile,
} from "lucide-react";
import {
  format,
  formatDistance,
  formatRelative,
  parseISO,
  subDays,
} from "date-fns";
import chatWallpaper from "../../assets/photos/ChatWallpaper.jpg";
import AddGroupMembers from "../Group/AddGroupMembers";

const AlloChat = ({ darkMode, socket }) => {
  // Declare all hooks at the top of the component
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.username);
          setUsername(data.username);
        } else {
          console.error("Error fetching user data:", response.statusText);
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []); // Runs once when the component is mounted

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/conver_get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          window.location.href = "/login";
        } else if (response.ok) {
          const data = await response.json();
          setGroups(data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Fetch previous messages when joining a room
    const handlePreviousMessages = (messages) => {
      console.log("Previous messages received:", messages);
      setMessagesReceived(
        messages.map((msg) => ({
          message: msg.message,
          username: msg.username,
          __createdtime__: new Date(msg.timestamp).toLocaleString(),
          type: msg.username === username ? "sent" : "received", // Determine type
        }))
      );
    };

    // Handle new incoming messages
    const handleReceiveMessage = (data) => {
      console.log("New message received:", data);

      const messageDate = parseISO(data.timestamp);
      if (isNaN(messageDate.getTime())) {
        console.error("Invalid timestamp:", data.timestamp);
        return;
      }

      setMessagesReceived((prev) => [
        ...prev,
        {
          message: data.message,
          username: data.username,
          __createdtime__: messageDate.toLocaleString(),
          type: data.username === username ? "sent" : "received", // Fix: Show both sent & received messages
        },
      ]);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("previous_messages", handlePreviousMessages);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("previous_messages", handlePreviousMessages);
    };
  }, [socket, username]); // Fix: Depend on `username` to track sender

  // Join room when changing rooms
  useEffect(() => {
    if (socket && room) {
      socket.emit("join_room", room);
      setMessagesReceived([]); // Clear messages on room change
    }
  }, [room, socket]);

  // Send message
  const sendMessage = () => {
    if (messageText.trim()) {
      const messageData = {
        message: messageText,
        username: username, // Include sender username
        room: room,
        timestamp: new Date().toISOString(),
      };

      socket.emit("send_message", messageData);
      setMessagesReceived((prev) => [
        ...prev,
        { ...messageData, type: "sent" }, // Ensure sender's messages appear
      ]);
      setMessageText("");
    }
  };

  const toggleHandler = () => setIsToggled(!isToggled);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  socket.on("previous_messages", (messages) => {
    console.log("Previous messages in the room:", messages);
  });
  return (
    <div className="flex h-screen">
      {/* Groups List Sidebar */}
      <div
        className={` overflow-y-auto w-1/4 p-4 border-r border-2 border-blue-800 rounded-xl mr-4 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Équipes
          </h2>
          <button
            onClick={toggleHandler}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-purple-700 hover:bg-purple-600"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white`}
          >
            <Plus size={20} />
          </button>
        </div>

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
                ? "bg-gray-700 border-gray-600 focus:ring-purple-500 text-white"
                : "bg-gray-100 border-gray-300 focus:ring-purple-300 text-black"
            }`}
          />
        </div>

        <div className="space-y-2 ">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => {
                setSelectedGroup(group);
                setRoom(group.id);
              }}
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
              <Users
                size={20}
                className={darkMode ? "text-purple-300" : "text-purple-600"}
              />
              <div className="flex-1 ml-3">
                <p className={darkMode ? "text-white" : "text-gray-800"}>
                  {group.name}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {group.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`w-3/4 flex flex-col ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
        style={{
          backgroundImage: `url(${chatWallpaper})`,
          backgroundSize: "cover",
        }}
      >
        {selectedGroup ? (
          <>
            {/* Chat Header */}
            <div
              className={`p-4 border-b ${
                darkMode
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Users
                    size={24}
                    className={darkMode ? "text-white" : "text-black"}
                  />
                  <h3
                    className={`text-xl font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {selectedGroup.name}
                  </h3>
                </div>
                <div className="flex space-x-4">
                  <PhoneCall className="cursor-pointer text-gray-500 hover:text-purple-600" />
                  <h2>{username}</h2>
                  <Video className="cursor-pointer text-gray-500 hover:text-purple-600" />
                  <UserPlus className="cursor-pointer text-gray-500 hover:text-purple-600" />
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesReceived.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "sent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-lg mx-2 p-3 rounded-lg ${
                      message.type === "sent"
                        ? "bg-purple-500 text-white"
                        : darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p className="font-semibold">{message.username}</p>
                    <p>{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === "sent"
                          ? "text-purple-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.__createdtime__}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div
              className={`p-4 border-t ${
                darkMode
                  ? "border-gray-800 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Envoyer un message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className={`flex-1 p-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                />
                <button
                  onClick={sendMessage}
                  className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
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

      {isToggled && (
        <AddGroupMembers
          darkMode={darkMode}
          onClose={() => setIsToggled(false)}
          setGroups={setGroups}
        />
      )}
    </div>
  );
};

export default AlloChat;
