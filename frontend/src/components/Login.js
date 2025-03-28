import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/validate_login', {
        username,
        password
      });
      if (response.data.success) {
        navigate('/predict');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#007BFF', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;