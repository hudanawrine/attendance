import React, { useState } from 'react';
import novox from '../assets/images/novol.jpg';
import logo from '../assets/images/logoimg.jpeg';
import './Userlogin.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Userlogin = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const loginClick = async (e) => {
    e.preventDefault();
    
    if (!Email || !Password) {
      alert('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/employeelogin', {
        Email: Email,
        Password: Password
      });

      if (response.data.status) {
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        alert('Login successful!');
        navigate('/attendancepage');

        // navigate(`/attendancepage/${response.data.data._id}`);
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        alert('Login failed: ' + error.response.data.message);
      } else {
        alert('Login failed: ' + error.message);
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
        <h3 className='hd1'>USER LOGIN</h3>
        <p className='p1'>Login with your <span className='ad'>user</span> credential.</p>

        <form onSubmit={loginClick}>
          <div className='d1'>
            <span className='icon1'><FaRegUser /></span>
            <input 
              className='name1' 
              type="email" 
              placeholder='Enter Email...' 
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='d1'>
            <span className='icon1'><IoIosLock /></span>
            <input 
              className='name1' 
              type="password" 
              placeholder='Enter password...' 
              value={Password}
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
          <p>
            Admin? <span 
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/admin')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Userlogin;