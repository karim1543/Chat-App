import { useState } from 'react';
import API from '../../api';

export default function UserSearch({ onSelectUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const { data } = await API.get(`/users?search=${query}`);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex space-x-2 mb-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
      </form>
      {results.map((user) => (
        <div
          key={user._id}
          className="p-2 border rounded mb-1 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectUser(user)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}