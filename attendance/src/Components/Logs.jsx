import React from 'react';
import './Logs.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'

const Logs = () => {
    const [Names, setNames] = useState([])



    useEffect(() => {
        const admin = localStorage.getItem("adminData")
        if (!admin) {
            window.location.href = "/admin"
        }
        getLogs()

    }, [])

    const getLogs = async () => {
        const response = await axios.get('http://localhost:4000/attendlist')
        console.log(response.data)
        setNames(response.data)

    }

    const getChecks = async () => {
        const response = await axios.get('')
    }




    return (
        <>
            <div className='mainnndivv'>
                <div className="">
                    <div>
                        <h2 className='logs '>Logs</h2>
                    </div>
                    <table>


                        <thead>
                            <tr className="head rounded">
                                <th>No.</th>
                                <th>Name</th>
                                <th>Check In Time</th>
                                <th>Check In Out</th>
                                <th>Status Today</th>
                            </tr>
                        </thead>
                        {Names.map((items, index) => (
                            <tbody key={items._id}>
                                <tr className='head hd hds '>
                                    <td className='letters'>{index + 1}</td>
                                    <td className='letters'>
                                        {items.userId?.FirstName} {items.userId?.LastName}
                                    </td>
                                    <td className='letters'>
                                        {items.Checkin ? new Date(items.Checkin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                                    </td>
                                    <td className='letters'>
                                        {items.Checkout ? new Date(items.Checkout).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                                    </td>
                                    <td className='letters'>
                                        <button className='btn rounded button'>{items.status || 'N/A'}</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}


                    </table>
                </div>
            </div>
        </>



    );
}

export default Logs;













// import React, { useEffect, useState } from 'react';
// import './Logs.css';
// import axios from 'axios';
// import moment from 'moment';

// const Logs = () => {
//   const [users, setUsers] = useState([]);
//   const [attendances, setAttendances] = useState([]);

//   useEffect(() => {
//     const admin = localStorage.getItem("adminData");
//     if (!admin) {
//       window.location.href = "/admin";
//     }

//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const [userRes, attendanceRes] = await Promise.all([
//         axios.get('http://localhost:4000/list'),
//         axios.get('http://localhost:4000/attendlist')
//       ]);

//       const users = userRes.data;
//       const attendanceData = attendanceRes.data;

//       setUsers(users);
//       setAttendances(attendanceData);
//     } catch (error) {
//       console.error("Error fetching logs:", error);
//     }
//   };

//   // Helper: Get latest attendance by userId
//   const getLatestAttendance = (userId) => {
//     const records = attendances.filter(att => att.userId === userId);
//     if (!records.length) return null;
//     return records[records.length - 1]; // latest
//   };

//   return (
//     <div className='mainnndivv'>
//       <div>
//         <h2 className='logs'>Logs</h2>
//         <table>
//           <thead>
//             <tr className="head rounded">
//               <th>No.</th>
//               <th>Name</th>
//               <th>Check In Time</th>
//               <th>Check Out Time</th>
//               <th>Status Today</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => {
//               const attendance = getLatestAttendance(user._id); // match by userId

//               const checkin = attendance?.Checkin
//                 ? moment(attendance.Checkin).format("hh:mm A")
//                 : "--";

//               const checkout = attendance?.Checkout
//                 ? moment(attendance.Checkout).format("hh:mm A")
//                 : "--";

//               return (
//                 <tr key={index} className='head hd hds'>
//                   <td className='letters'>{index + 1}</td>
//                   <td className='letters'>{user.FirstName} {user.LastName}</td>
//                   <td className='letters'>{checkin}</td>
//                   <td className='letters'>{checkout}</td>
//                   <td className='letters'>
//                     <button className='btn rounded button'>
//                       {attendance?.status || "N/A"}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Logs;

