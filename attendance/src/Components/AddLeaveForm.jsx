import React, { useEffect, useState } from 'react';
import './AddLeaveForm.css'; // You'll create this CSS file for styling
import axios from 'axios';

const AddLeaveForm = () => {
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [fromDate, setFromDate] = useState('26/07/2024'); // Initial value from image
  const [toDate, setToDate] = useState('26/07/2024');   // Initial value from image
  const [fromDayPart, setFromDayPart] = useState('Full day');
  const [toDayPart, setToDayPart] = useState('Full day');
  const [reason, setReason] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [users, setusers] = useState({});
  const [datas, setdatas] = useState({"FirstName":"","LastName":""})

  const handleSubmit = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("userData"));
  const fromDateFormatted = fromDate.split("-").reverse().join("/");
  const toDateFormatted = toDate.split("-").reverse().join("/");

  try {
    const res = await axios.post(`http://localhost:4000/attend/${user.id}`, {
      Leavetype: leaveType,
      From: fromDateFormatted,
      To: toDateFormatted,
      Reason: reason,
    });

    alert("Leave request submitted!");
    console.log(res.data);
  } catch (error) {
    console.error("Leave request failed:", error);
    alert("Failed to submit leave.");
  }
};


 useEffect(() => {
  const user = localStorage.getItem('userData')
  setdatas(JSON.parse(user))
 }, [])
 

  return (
    <div className="add-leave-form-container">
      <div className="add-leave-form-header">
        <h2>Add Leave</h2>
      </div>

      <div className="user-info">
        {/* <img src="https://via.placeholder.com/40" alt="Oliver Smith" className="user-avatar" /> */}
        <div>
          <h5>{datas.FirstName}{datas.LastName}</h5>
          <p>{}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type *</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            {/* Add more leave types as needed */}
          </select>
        </div>

        <div className="form-group date-group">
          <div>
            <label htmlFor="fromDate">From *</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate.split('/').reverse().join('-')} // Convert DD/MM/YYYY to YYYY-MM-DD for input type="date"
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-');
               setFromDate(`${day}/${month}/${year}`); // Convert back to DD/MM/YYYY for state
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="toDate">To *</label>
            <input
              type="date"
              id="toDate"
              value={toDate.split('/').reverse().join('-')} // Convert DD/MM/YYYY to YYYY-MM-DD for input type="date"
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-');
                setToDate(`${day}/${month}/${year}`); // Convert back to DD/MM/YYYY for state
              }}
              required
            />
          </div>
        </div>

       
         
        <div className="form-group">
          <label htmlFor="reason">Reason *</label>
          <textarea
            id="reason"
            placeholder="Reason for Leave"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        

        {/* You'd typically have a submit button here, which isn't visible in the cropped image */}
        <button type="submit" className="submit-button">Submit Leave Request</button>
      </form>
    </div>
  );
};

export default AddLeaveForm;