// import { useEffect, useRef, useState } from 'react';
// import API from '../../api';
// import MessageInput from './MessageInput';
// import { useSocket } from '../../context/SocketContext';

// export default function ChatWindow({ selectedChat, user }) {
//   const [messages, setMessages] = useState([]);
//   const socket = useSocket();
//   const endRef = useRef();

//   useEffect(() => {
//     if (selectedChat) {
//       const fetchMessages = async () => {
//         const { data } = await API.get(`/messages/${selectedChat._id}`);
//         setMessages(data);
//       };
//       fetchMessages();
//       socket?.emit('joinChat', selectedChat._id);
//     }
//   }, [selectedChat]);

//   useEffect(() => {
//     socket?.on('receiveMessage', (msg) => {
//       if (msg.chatId === selectedChat?._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket?.off('receiveMessage');
//   }, [socket, selectedChat]);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async (text) => {
//     const msgPayload = {
//       chatId: selectedChat._id,
//       text,
//     };

//     const { data } = await API.post('/messages', msgPayload);
//     socket?.emit('sendMessage', {
//       senderId: user._id,
//       receiverId: selectedChat.members.find((m) => m._id !== user._id)._id,
//       chatId: selectedChat._id,
//       text: data.text,
//     });
//     console.log('selectedChat:', selectedChat);


//     setMessages((prev) => [...prev, data]);
//   };

//   if (!selectedChat) {
//     return <div className="w-2/3 p-6 flex items-center justify-center text-gray-500">Select a chat</div>;
//   }
// const receiver = selectedChat?.members?.find((m) => m._id !== user._id);
// if (!receiver) return; 
//   return (
//     <div className="w-2/3 flex flex-col p-4">
//       <div className="flex-1 overflow-y-auto space-y-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`max-w-xs p-2 rounded ${
//               msg.sender._id === user._id ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         <div ref={endRef} />
//       </div>
//       <MessageInput onSend={handleSend} />
//     </div>
//   );
// }


import { useEffect, useState, useRef } from 'react';
import API from '../../api';
import MessageInput from './MessageInput';
import { useSocket } from '../../context/SocketContext';

export default function ChatWindow({ selectedChat, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const socket = useSocket();
  const endRef = useRef();

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          setLoading(true);  // Set loading to true before fetching
          const { data } = await API.get(`/messages/${selectedChat._id}`);
          setMessages(data);
          setLoading(false);  // Set loading to false when data is fetched
        } catch (err) {
          console.error('Error fetching messages:', err);
          setLoading(false);  // Set loading to false on error
        }
      };

      fetchMessages();
      socket?.emit('joinChat', selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket?.on('receiveMessage', (msg) => {
      if (msg.chatId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket?.off('receiveMessage');
  }, [socket, selectedChat]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const msgPayload = {
      chatId: selectedChat._id,
      text,
    };

    const { data } = await API.post('/messages', msgPayload);
    socket?.emit('sendMessage', {
      senderId: user._id,
      receiverId: selectedChat.members.find((m) => m._id !== user._id)._id,
      chatId: selectedChat._id,
      text: data.text,
    });

    setMessages((prev) => [...prev, data]);
  };

  if (loading) {
    return <div className="w-2/3 p-6 text-center">Loading chat...</div>;
  }

  if (!selectedChat) {
    return <div className="w-2/3 p-6 flex items-center justify-center text-gray-500">Select a chat</div>;
  }

  return (
    <div className="w-2/3 flex flex-col p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded ${
              msg.sender?._id === user._id ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}