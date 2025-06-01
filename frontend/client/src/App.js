import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import ChatPage from './pages/ChatPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/chats" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={user ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;