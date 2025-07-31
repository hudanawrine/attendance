import React, { useState } from 'react'
// import '../styles/Admintab.css';
import '../Components/Admintab.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdContact } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { HiCalendarDateRange } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { IoTimeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';



import employee from '../Components/EmployeesList'
import register from '../Components/Admindashboard'
import logs from '../Components/Logs'
import EmployeesList from '../Components/EmployeesList';
import Admindashboard from '../Components/Admindashboard';
import Logs from '../Components/Logs';
import AttendanceHistory from './AttendanceHistory';
import Reporter from './Reporter';
import Activitylog from './Activitylog';
import Details from './Details';
import Logout from './Adminlogin';
import Exams from './Exams';
import Courses from './Courses';




const Admintabdashbord = () => {
  const [activeTab, setActiveTab] = useState('employee');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'employee': return <EmployeesList />;
      case 'employee/:id' : return <Details/>;
      case 'register': return <Admindashboard />;
      case 'logs': return <Logs />;
      // case 'activity':  return <Activitylog/>
      case 'courses' : return <Courses/>
      case 'attendance': return <AttendanceHistory />;
      // case 'report': return <Reporter />;
      case 'exams': return <Exams/>;
      case 'settings': return <Settings />;
      default: return <h2>Select a menu item</h2>;
    }
  };
  
const handleLogout = () => {
  localStorage.removeItem("adminData"); // clear login token/data
  window.location.href = "/admin"; // redirect to login page
};




  return (
    <div>

      <div className='main-div' style={{ display: 'flex' }}>
        <div className='dash col-lg-3'>
          <div className='top'>
            <img src="./src/assets/images/logowhite.png" alt="" className='imgg' />
          </div><br />
          <h4 className='admind'><b> ADMIN <br /> DASHBOARD</b></h4><br />
          <h5 className='menu'>MAIN MENU</h5><br />
          <ul className='ul'>
            <li className='emp-button' onClick={() => setActiveTab('employee')}>
              <IoMdContact style={{ width: 40, height: 40, marginRight: 20 }} /><b>Employee</b>
            </li><br />
            <li className='emp-button' onClick={() => setActiveTab('register')}>
              <LuNotebookPen style={{ width: 40, height: 40, marginRight: 20 }} /><b>Register</b>
            </li><br />
            <li className='emp-button' onClick={() => setActiveTab('logs')}>
              <HiCalendarDateRange style={{ width: 40, height: 40, marginRight: 20 }} /><b>Logs</b>
            </li><br />
            {/* <li className='emp-button' onClick={() => setActiveTab('report')}>
              <TbReportSearch style={{ width: 40, height: 40, marginRight: 20 }} /><b>Report</b>
            </li><br /> */}
            <li className='emp-button' onClick={() => setActiveTab('exams')}>
              <TbReportSearch style={{ width: 40, height: 40, marginRight: 20 }} /><b>Exams</b>
            </li><br />
            {/* <li className='emp-button' onClick={() => setActiveTab('activity')}>
              <IoTimeOutline style={{ width: 40, height: 40, marginRight: 20 }} /><b>Activity Logs</b>
            </li><br /> */}
            <li className='emp-button' onClick={() => setActiveTab('courses')}>
              <IoTimeOutline style={{ width: 40, height: 40, marginRight: 20 }} /><b>Courses</b>
            </li><br />
            <li className='emp-button' onClick={() => setActiveTab('attendance')}>
              <IoPeopleOutline style={{ width: 40, height: 40, marginRight: 20 }} /><b>Attendance</b>
            </li><br />
          </ul>

          <h5 className='menu'>SETTINGS</h5><br />
          <ul className='ul'>
            <li className='emp-button' onClick={() => setActiveTab('settings')}>
              <IoSettingsOutline style={{ width: 40, height: 40, marginRight: 20 }} /><b>Settings</b>
            </li><br />
            <li className='emp-button' onClick={handleLogout}>
              <IoLogOutOutline style={{ width: 40, height: 40, marginRight: 20 }} /><b>Logout</b>
            </li>
          </ul>
        </div>

        <div className="content-area" style={{ flex: 1, padding: '10px' }}>
          {renderActiveComponent()}
        </div>
      </div>


    </div>
  )
}

export default Admintabdashbord