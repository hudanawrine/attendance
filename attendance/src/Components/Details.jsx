import React, { useEffect, useState } from 'react'
import emp from '../assets/images/emp.png'

import arrow from '../assets/images/arroww.png'
// import arroww from '../assets/images/arrow.png'
import round from '../assets/images/Ellipse.png'
// import '../compontes/Details.css'
import '../Components/Details.css'
import clock from '../assets/images/clock.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Details = () => {
    const [details, setdetails] = useState({})
    const { employeeId } = useParams();
    const [totalAttendance, setTotalAttendance] = useState(0);


    useEffect(() => {
         const admin= localStorage.getItem("adminData")
        if(!admin){
            window.location.href="/admin"
        }
        getDetails()
        getTotalAttendance();
    }, [employeeId])



    const getDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/profile/${employeeId}`)
            console.log("uses::", response.data)
            // const employee = response.data.find(emp => String(emp._id) === String(_id));
            // setdetails(response.data)
            setdetails(response.data)
        } catch (error) {
            console.error('Error fetching employee:', error);
        }

    }

    const getTotalAttendance = async () => {
  try {
    const response = await axios.get(`http://localhost:4000/getAttendById/${employeeId}`);
    const records = response.data;

    // Count only present/late/absent (exclude leaves)
    const attendanceCount = records.filter(record =>
      record.status === "Present" || record.status === "Late" || record.status === "Absent"
    ).length;

    setTotalAttendance(attendanceCount);
  } catch (error) {
    console.error("Error fetching total attendance:", error);
  }
};



    return (
        <div>
            {/* {details.map((items) => ( */}
            <div>
                <div className='topc'>
                    <h1 className='empdetails'>{details.FirstName}{details.LastName}</h1>
                    <button className='editt'>EDIT</button>
                </div>
                <div className='imgdiv'>
                    <div>
                        <img src={emp} alt="" className='imggirl' />
                    </div>
                    <div className='subc'>
                        <div className='smdiv'>
                            <h4 className='phno'>Phone Number</h4>
                            <h3 className='number'>{details.ContactNumber}</h3>
                        </div><br />
                        <div className='smdiv'>
                            <h4 className='phno'>Address</h4>
                            <h3 className='number'>{details.Address}</h3>
                        </div><br />
                        <div className='smdiv'>
                            <h4 className='phno'>Age</h4>
                            <h3 className='number'>{details.Age}</h3>
                        </div><br />
                        {/* <div className='smdiv1'>
                            <h4 className='phno'>Status Today</h4>
                            <img src="" alt="" />
                            <button className='presentbtn'><li>Present</li></button>
                        </div><br /><br /> */}

                        <div className='smdiv'>
                            <h4 className='phno'>Email</h4>
                            <h3 className='number'>{details.Email}</h3>
                        </div><br />
                        <div className='smdiv'>
                            <h4 className='phno'>Designation</h4>
                            <h3 className='number'>{details.Designation}</h3>
                        </div><br />
                        <div className='smdiv'>
                            <h4 className='phno'>Address</h4>
                            <h3 className='number'>{details.Address}</h3>
                        </div>
                        {/* <div className='smdiv1'>
                            <h4 className='phno'>Designation</h4>
                            <h3 className='number'>{details.Desigation}</h3>
                        </div> */}
                        
                    </div>
                </div>
            </div>
            {/* ))}  */}
            <div className='bottomdiv'>
                {/* <div className='imgdivv'>
                    <img src={arrow} alt="" className='imgg' />
                </div> */}
                <div className='btm container'>
                    <h1 className='btmhead'>{totalAttendance}</h1>
                    <h2 className='btmpara'>Total  Attendance</h2>
                </div>
            </div>
            <div className='bottomdiv1'>
                {/* <div className='imgdivv1'>
                    <img src={clock} alt="" className='imgg1' />
                </div> */}
                <div className='btm container'>
                    <h1 className='btmhead'>64:40:40</h1>
                    <h2 className='btmpara'>Total Hours</h2>
                </div>
            </div>

        </div>

    )
}


export default Details