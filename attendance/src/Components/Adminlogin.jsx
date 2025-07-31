import React, { useState } from 'react';
import novox from '../assets/images/novol.jpg';
import logo from '../assets/images/logoimg.jpeg';
import './Adminpage.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Adminlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const adminLoginClick = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/adminlogin', {
        UserName: username,
        Password: password
      });

      if (response.data.status) {
        // Store admin data in localStorage
        localStorage.setItem('adminData', JSON.stringify(response.data.data));
        alert('Admin login successful!');
        navigate('/mainpage');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Admin login error:', error);
      if (error.response && error.response.data) {
        alert('Login failed: ' + error.response.data.message);
      } else {
        // For demo purposes, allow admin login with default credentials
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem('adminData', JSON.stringify({ username: 'admin', role: 'admin' }));
          alert('Admin login successful!');
          navigate('/mainpage');
        } else {
          alert('Login failed: Invalid credentials');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mdiv'>
      <div>
        <img className='pic' src={novox} alt="" />
      </div>
      <div>
        <img className='lg' src={logo} alt="" />
        <h3 className='hd1'>ADMIN LOGIN</h3>
        <p className='p1'>Login with your <span className='ad'>admin</span> credential.</p>

        <form onSubmit={adminLoginClick}>
          <div className='d1'>
            <span className='icon1'><FaRegUser /></span>
            <input 
              className='name1' 
              type="text" 
              placeholder='Enter username...' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='d1'>
            <span className='icon1'><IoIosLock /></span>
            <input 
              className='name1' 
              type="password" 
              placeholder='Enter password...' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            className='btn1' 
            type="submit"
            disabled={isLoading}
          >
            <b>{isLoading ? 'LOGGING IN...' : 'LOGIN'}</b>
          </Button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Demo credentials: admin / admin123
          </p>
          <p>
            Employee? <span 
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;