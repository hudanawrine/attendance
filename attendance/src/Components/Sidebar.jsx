import React from 'react';

const Sidebar = ({ onMenuClick }) => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f2f2f2', height: '100vh', padding: '20px' }}>
      <button onClick={() => onMenuClick('logs')}>Logs</button><br />
      <button onClick={() => onMenuClick('register')}>Register</button><br />
      <button onClick={() => onMenuClick('attendance')}>Attendance</button><br />
    </div>
  );
};

export default Sidebar;