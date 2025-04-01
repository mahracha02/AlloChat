import { Plus, X } from "lucide-react";
import React, { useState, useEffect } from "react";

const AddGroupMembers = ({ darkMode, onAddMembers }) => {
  const [username, setUsername] = useState("");
  const [members, setMembers] = useState([]); // Store users as { id, name }
  const [users, setUsers] = useState([]); // Store all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupeName, setGroupeName] = useState("");

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        window.location.href = "/login";
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
          console.log(data); // Store all users
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // ✅ Add user by ID instead of name only
  const addUser = (user) => {
    if (!members.some((m) => m.id === user.id)) {
      setMembers([...members, { id: user.id, name: user.username }]);
    }
  };

  // ✅ Remove user from members
  const removeMember = (memberId) => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    setMembers(updatedMembers);
    if (onAddMembers) onAddMembers(updatedMembers);
  };

  // ✅ Send selected members' IDs to Symfony API
  const createGroupe = async () => {
    if (members.length === 0) {
      alert("Please add members before creating a group.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      window.location.href = "/login";
      return;
    }
    // Extract IDs from selected members
    const selectedUserIds = members.map((user) => user.id);

    console.log("Members:", members); // Debugging
    console.log("Extracted users_id:", selectedUserIds); // Debugging

    const groupData = {
      userIds: selectedUserIds, // Ensure a valid name
      name: groupeName || "Default Group Name", // Send formatted IDs
    };
    console.log(groupData);
    alert(groupData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/conver_create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      const result = await response.json();
      alert("Group created successfully! 🎉");
      window.location.reload();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create group. Please try again.");
    }
  };

  return (
    <div
      className={`w-full p-4 rounded-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2>Groupe Name</h2>
      <input
        type="text"
        value={groupeName}
        onChange={(e) => setGroupeName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      <h2 className="text-lg font-bold mb-2">Add Group Members</h2>

      {/* Available Users */}
      <div>
        <h2 className="font-bold">Create groupe : {groupeName}</h2>
        <ul className="list-disc pl-5 flex flex-col">
          {users.map((user) => (
            <button
              onClick={() => addUser(user)}
              className="hover:bg-gray-200 p-2"
              key={user.id}
            >
              {user.username}
            </button>
          ))}
        </ul>
      </div>

      {/* Selected Members */}
      {members.length > 0 && (
        <div className="space-y-2 mt-4">
          <h2 className="font-bold">Selected Members:</h2>
          {members.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              <span>{member.name}</span>
              <button
                onClick={() => removeMember(member.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Group Button */}
      <button
        onClick={createGroupe}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Create Group
      </button>
    </div>
  );
};

export default AddGroupMembers;
