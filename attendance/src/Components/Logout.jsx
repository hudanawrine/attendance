import React from 'react'

const handleLogout = () => {
  localStorage.removeItem("adminData"); // clear login token/data
  window.location.href = "/admin"; // redirect to login page
};

const Logout = () => {
  return (
    <div>
        <div className="header">
  <h2 className='logs'>Logs</h2>
  <button onClick={handleLogout} className="logout-btn">Logout</button>
</div>

      
    </div>
  )
}

export default Logout

