// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import Logs from './Components/Logs';
import Admindashboard from './Components/Admindashboard';
import EmployeesList from './Components/EmployeesList';
import Details from './Components/Details';
import Admintabdashbord from './Components/Admintabdashbord';
import Leave_mark from './Components/Leave_mark';
import AddLeaveForm from './Components/AddLeaveForm';
import Userlogin from './Components/Userlogin';
import Adminlogin from './Components/Adminlogin';
import AttendanceCard from './Components/AttendanceCard';
 import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
 

  return (
    <>
      {/* <Dashboard/> */}
      {/* <Logs/> */}
      {/* <Admindashboard/> */}
      {/* <EmployeesList/> */}
      {/* <Details/> */}
      {/* <Admintabdashbord/> */}
      {/* <Leave_mark/> */}
      {/* <AddLeaveForm/> */}
      {/* <Userlogin/> */}
      {/* <Adminlogin/> */}
      {/* <AttendanceHistory/> */}
      {/* <AttendanceCard/> */}
      
      <Routes>
    <Route path='/' element={<Userlogin/>} />
    <Route path='/attendancepage' element={<AttendanceCard/>} />

{/* <Route path='/attendancepage' element={<AttendanceCard/>} /> */}

      {/* <Route path='/' element={< Adminlogin />}/> */}
      <Route path='/addleave' element={<AddLeaveForm />}/>
      {/* <Route path='/mainpage' element={<Admintabdashbord/>}/> */}
      
        {/* <Route path="/" element={<EmployeesList />} /> */}
        <Route path="/employee/:employeeId" element={<Details />} />
        <Route path='/admin' element={<Adminlogin/>}/>
        <Route path='/mainpage' element={<Admintabdashbord/>}/>
     
      </Routes>
      
{/* <DashboardLayout/> */}


      {/* <Router>
      <Routes>
        <Route path="/" element={<Adminlogin />} />
        <Route path="/mainpage" element={<EmployeesList />} />
      </Routes>
    </Router> */}
    </>
  )
}
import { PiRowsPlusTop } from 'react-icons/pi';
import DashboardLayout from './Components/DashboardLayout';
import AttendanceHistory from './Components/AttendanceHistory';

export default App
