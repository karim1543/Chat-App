import { useState } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);
      login(data);
      navigate('/chats');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="username" onChange={handleChange} value={form.username} className="w-full p-2 border rounded" placeholder="Username" required />
        <input type="email" name="email" onChange={handleChange} value={form.email} className="w-full p-2 border rounded" placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} value={form.password} className="w-full p-2 border rounded" placeholder="Password" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}