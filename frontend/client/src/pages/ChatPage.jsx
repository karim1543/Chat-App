import { useEffect, useState } from 'react';
import API from '../api';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import { useAuth } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';

// export default function ChatPage() {
//   const { user } = useAuth();
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const { data } = await API.get('/chats');
//         setChats(data);
//       } catch (err) {
//         console.error('Error fetching chats', err);
//       }
//     };

//     fetchChats();
//   }, []);

//   return (
//     <SocketProvider user={user}>
//       <div className="flex h-screen">
//         <ChatList
//           chats={chats}
//           setChats={setChats}
//           selectedChat={selectedChat}
//           setSelectedChat={setSelectedChat}
//         />
//         <ChatWindow selectedChat={selectedChat} user={user} />
//       </div>
//     </SocketProvider>
//   );
// }
export default function ChatPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await API.get('/chats');
        setChats(data);
      } catch (err) {
        console.error('Error fetching chats', err);
      }
    };

    fetchChats();
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <SocketProvider user={user}>
      <div className="flex h-screen">
        <ChatList
          chats={chats}
          setChats={setChats}
          selectedChat={selectedChat}
          setSelectedChat={handleChatSelect}
        />
        <ChatWindow selectedChat={selectedChat} user={user} />
      </div>
    </SocketProvider>
  );
}