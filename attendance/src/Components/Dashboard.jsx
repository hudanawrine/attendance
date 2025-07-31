import React from 'react'
import './dashboard.css'
import { CgProfile } from "react-icons/cg";
import { PiNotePencilLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { PiNotepadThin } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";

import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";



import logo from '../assets/images/LOGOWHITE.png'







const Dashboard = () => {
  return (
    <div>
      <div className='main-div'>
        <div className='dash col-lg-3'>
          <div className='top'>
            <img src={logo} alt="" className='imgg' />
          </div><br />
          <h4 className='admind'><b> ADMIN <br /> DASHBOARD</b></h4><br />
          <h5 className='menu'><b>MAIN MENU</b></h5><br />

          <button className='emp'>
            <a href=""></a> <CgProfile className='iconn'/>  Employee</button><br />
          <button className='emp'><PiNotePencilLight className='iconn'/> Register</button><br />
          <button className='emp'> <SlCalender className='iconn'/> Logs</button><br />
          <button className='emp'> <PiNotepadThin className='iconn'/>  Report</button><br />
          <button className='emp'> <IoTimeOutline className='iconn'/>  Activity Logs</button> <br />
          <button className='emp'> <IoPeopleOutline className='iconn'/>  Employee attendance</button><br />


          <h5 className='menu'><b>SETTINGS</b></h5><br />
          <button className='emp'> <IoSettingsOutline className='iconn'/>   Settings</button><br />
          <button className='emp'> <IoIosLogOut className='iconn'/>  Logout</button>

        </div>
        <div className='sub'></div>
      </div>
    </div>
  )
}

export default Dashboard
