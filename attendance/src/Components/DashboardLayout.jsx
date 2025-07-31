import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Logs from './Logs';
// import Register from './Register';
// import Attendance from './Attendance';
import Admindashboard from './Admindashboard';
import EmployeesList from './EmployeesList';

const DashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState('Logs'); // default

  const renderComponent = () => {
    switch (activeComponent) {
      case 'logs':
        return <Logs />;
      case 'register':
        return <Admindashboard />;
      case 'employeelist':
        return <EmployeesList />;
      default:
        return <h2>Select a section</h2>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onMenuClick={setActiveComponent} />
      <div style={{ flex: 1, padding: '20px' }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default DashboardLayout;