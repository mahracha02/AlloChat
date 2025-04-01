import React, { useState, useEffect } from "react";

const GroupList = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch groups data
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/convo/show");
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

  return (
    <div className="w-1/4 p-4 border-r border-2 border-blue-800 rounded-xl mr-4">
      <h2 className="text-xl font-bold">Groups</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Group list */}
      <div className="space-y-2">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => onGroupSelect(group)} // Trigger onGroupSelect when a group is clicked
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-200"
          >
            <p className="font-semibold">{group.name}</p>
            <p className="text-xs">{group.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
