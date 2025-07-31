

import React, { useState } from 'react';
import '../Components/AttendanceCard.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';

// import '../compontes/AttendanceCard.css'; // Import the external CSS file
// import  addleave from '../compontes/AddLeaveForm'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AttendanceCard = () => {
  const [date, setDate] = useState("")
  const [status, setstatus] = useState("")
  const [Present, setPresent] = useState("")
  const [Checkin, setCheckin] = useState("")
  const [Checkout, setCheckout] = useState("")
  const [Leavetype, setLeavetype] = useState("")
  const [From, setFrom] = useState("")
  const [To, setTo] = useState("")
  const [Reason, setReason] = useState("")
  const [datas, setdatas] = useState({})
  const [workingTime, setWorkingTime] = useState("");
  const [breakActive, setBreakActive] = useState(false);
  const [pauseStart, setPauseStart] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const { EmpId } = useParams()
  const [userdata, setUserData] = useState({ "FirstName": "", "LastName": "" })
  const [finalWorkingHours, setFinalWorkingHours] = useState('');

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [alreadyCheckedInToday, setAlreadyCheckedInToday] = useState(false);
  const [alreadyCheckedOutToday, setAlreadyCheckedOutToday] = useState(false);





  const navigate = useNavigate();
  useEffect(() => {
    const admin = localStorage.getItem("userData")
    if (!admin) {
      window.location.href = "/admin"
    }




    // if (!userdata?.id || !datas?._id) {
    //   alert("User data is not loaded yet. Please try again.");
    //   return;
    // }




    let interval;

    if (Checkin && !Checkout && !breakActive) {
      const checkInMoment = moment(Checkin, "HH:mm");

      interval = setInterval(() => {
        const now = moment();
        const actualWorkingDuration = moment.duration(
          now.diff(checkInMoment) - pausedDuration
        );

        const hours = String(Math.floor(actualWorkingDuration.asHours())).padStart(2, "0");
        const minutes = String(actualWorkingDuration.minutes()).padStart(2, "0");
        const seconds = String(actualWorkingDuration.seconds()).padStart(2, "0");

        setWorkingTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    }

    if (Checkin && Checkout) {
      const checkInMoment = moment(Checkin, "HH:mm");
      const checkOutMoment = moment(Checkout, "HH:mm");
      const totalDuration = moment.duration(checkOutMoment.diff(checkInMoment) - pausedDuration);

      const hours = String(Math.floor(totalDuration.asHours())).padStart(2, "0");
      const minutes = String(totalDuration.minutes()).padStart(2, "0");
      const seconds = String(totalDuration.seconds()).padStart(2, "0");

      setWorkingTime(`${hours}:${minutes}:${seconds}`);
    }

    return () => clearInterval(interval);
  }, [Checkin, Checkout, breakActive, pausedDuration]);

  const handleAddLeaveClick = () => {
    navigate('/addleave');
  };


  const handleCkeckin = async () => {
    // if (!datas._id) {
    //   alert("User data not loaded yet. Please wait.");
    //   return;
    // }
    if (alreadyCheckedInToday) {
      alert("You've already checked in today.");
      return;
    }


    const now = new Date();
    const dateFormatted = moment(now).format("DD/MM/YYYY");
    const timeFormatted = moment(now).format("HH:mm");

    setDate(dateFormatted);
    setCheckin(timeFormatted);


    try {
      const attend = await axios.post('http://localhost:4000/attend/' + userdata.id, {
        userId: datas._id,
        type: "Check-in",
        date: dateFormatted,
        status: "",
        Checkin: timeFormatted,
      });
      alert("Checked in at " + now.toLocaleTimeString());
    } catch (error) {
      console.error("Check-in failed:", error);
    }


  }
  const handleCheckout = async () => {
    if (alreadyCheckedOutToday) {
      alert("You've already checked out today.");
      return;
    }




    const now = new Date();
    const dateFormatted = moment(now).format("DD/MM/YYYY");
    const timeFormatted = moment(now).format("HH:mm");

    const checkInMoment = moment(Checkin, "HH:mm");
    const currentMoment = moment();

    const totalWorkedMs = currentMoment.diff(checkInMoment) - pausedDuration;
    const totalWorkedHours = totalWorkedMs / (1000 * 60 * 60);


    // if (totalWorkedHours < 3) {
    //   alert("⛔ You cannot checkout before completing 3 hours.");
    //   return; // Stop here if time is less than 3 hours
    // }



    const hours = String(Math.floor(totalWorkedHours)).padStart(2, "0");
    const minutes = String(Math.floor((totalWorkedHours % 1) * 60)).padStart(2, "0");
    const seconds = String(Math.floor((totalWorkedHours * 3600) % 60)).padStart(2, "0");
    const formattedWorkingHours = `${hours}:${minutes}:${seconds}`;
    // e.g. "03:45"

    setCheckout(timeFormatted);
    setFinalWorkingHours(formattedWorkingHours);

    try {
      const attend = await axios.post('http://localhost:4000/attend/' + userdata.id, {
        userId: datas._id,
        date: dateFormatted,  // Send the date too
        Checkout: timeFormatted,
        WorkingHours: formattedWorkingHours
      });
      console.log("Saved to backend:", attend.data);
      alert("Checked out at " + now.toLocaleTimeString());
      setShowReviewModal(true); // Show review form

    } catch (error) {
      console.error("Check-out failed:", error);
    }
  };



  const submitReview = async () => {
    try {
      await axios.post('http://localhost:4000/attend/' + userdata.id, {
        userId: datas._id,
        date: moment().format("DD/MM/YYYY"),
        Rating: rating,
        Review: reviewText
      });
      alert("Thanks for your feedback!");
      setShowReviewModal(false);
      setRating(0);
      setReviewText("");
    } catch (err) {
      console.error("Review submit failed:", err);
      alert("Failed to submit review.");
    }
  };




  const handleBreakToggle = () => {
    if (!breakActive) {
      setPauseStart(moment());
      setBreakActive(true);
    } else {
      const now = moment();
      const thisPause = now.diff(pauseStart);
      setPausedDuration(prev => prev + thisPause);
      setBreakActive(false);
      setPauseStart(null);
    }
  };


  useEffect(() => {
    const user = localStorage.getItem('userData');
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);

    if (parsedUser?.id) {
      getProfile(parsedUser.id);
    }
  }, []);





  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/profile/${EmpId}`);
      setdatas(response.data);

      const today = moment().format("DD/MM/YYYY");
      const attendData = await axios.get(`http://localhost:4000/attend/history/${userId}`);
      const todayCard = attendData.data.find(item => item.date === today);

      if (todayCard) {
        if (todayCard.Checkin) {
          setAlreadyCheckedInToday(true);
          setCheckin(moment(todayCard.Checkin).format("HH:mm"));
        }
        if (todayCard.Checkout) {
          setAlreadyCheckedOutToday(true);
          setCheckout(moment(todayCard.Checkout).format("HH:mm"));
        }
      }


    } catch (error) {
      console.error('Error fetching employee or attendance:', error);
    }
  };




  return (

    <div className="attendance-card"  >
      <div className="top-status">
       
        <div
          className="clock-box clock-in"
          onClick={alreadyCheckedInToday ? null : handleCkeckin}
          style={{ backgroundColor: alreadyCheckedInToday ? "#ccc" : "" }}
        >

         
          <span className="icon">&#x2192;</span>
          <p>CHECK IN</p>
        </div>
        <span className="connector-line"></span> 
        <div
          className="clock-box clock-out"
          onClick={alreadyCheckedOutToday ? null : handleCheckout}
          style={{ backgroundColor: alreadyCheckedOutToday ? "#ccc" : "" }}
        >

          <span className="icon">&#x2190;</span>
          <p>CHECK OUT</p>
        </div>
      </div>

      <div className="user-info-and-time" >
        <div className="user-profile">
          <div className="profile-pic">

            👍

          </div>

          <><p className="user-name">{userdata.FirstName} {userdata.LastName}</p>
            <p className="user-title"></p></>

        </div>

        <div className="time-display">
          <div className="current-time">
            <p className="label green-text">CHECK IN TIME</p>
            <p className="value">  {Checkin ? moment(Checkin, "HH:mm").format("hh:mm A") : "--:--:--"}</p>
            {/* <p className="value">  {Checkin           }</p> */}
          </div>
          <div className="break-time">
            <p className="label red-text">CHECK OUT TIME</p>
            <p className="value">  {Checkout ? moment(Checkout, "HH:mm").format("hh:mm A") : "--:--:--"}</p>
            {Checkin && (
              <p className="value" style={{ fontSize: '15px', color: 'red', marginTop: '5px' }}>
                WORKING HOURS: {workingTime}
              </p>
            )}
            {finalWorkingHours && (
              <p>Final Working Hours: {finalWorkingHours}</p>
            )}
          </div>
        </div>
      </div>

      <div className="action-buttons">
        {/* <button className="button green-button">ADD LEAVE</button> */}
        {/* <button className="button red-button" >ADD LEAVE</button> */}
        <button className="button red-button" onClick={handleBreakToggle}>
          {breakActive ? "RESUME" : "BREAK"}
        </button>
        <button className="button red-button" onClick={handleAddLeaveClick}>ADD LEAVE</button>


      </div>
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Rate Your Day</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  style={{
                    fontSize: "2rem",
                    color: num <= rating ? "#ffc107" : "#ccc",
                    cursor: "pointer"
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              style={{ width: "100%", marginTop: "1rem" }}
            />
            <div style={{ marginTop: "1rem" }}>
              <button onClick={submitReview}>Submit</button>
              <button onClick={() => setShowReviewModal(false)} style={{ marginLeft: "1rem" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


  );
};

export default AttendanceCard;