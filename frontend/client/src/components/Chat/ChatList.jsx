import UserSearch from './UserSearch';
import API from '../../api';

export default function ChatList({ chats, setChats, selectedChat, setSelectedChat }) {
  const handleUserSelect = async (user) => {
    try {
      const { data } = await API.post('/chats', { userId: user._id });

      // If new chat, prepend it
      const exists = chats.find(c => c._id === data._id);
      if (!exists) setChats([data, ...chats]);

      setSelectedChat(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-1/3 border-r p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Chats</h2>
      <UserSearch onSelectUser={handleUserSelect} />
      {chats.map((chat) => {
        const otherUser = chat.members.find((m) => m._id !== selectedChat?.user?._id);
        return (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`p-3 rounded cursor-pointer mb-2 ${
              selectedChat?._id === chat._id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">{otherUser?.username || 'Chat'}</div>
            <div className="text-sm text-gray-500 truncate">{chat.lastMessage?.text}</div>
          </div>
        );
      })}
    </div>
  );
}