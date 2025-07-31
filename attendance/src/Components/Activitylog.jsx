import React from 'react'
import './Activitylog.css';

const Activitylog = () => {
  return (

  <>
    <div className="activity-mainbody">
      <h2 className="activity-title">Activity Logs</h2>
      <table>
        <tr className='rows'>
          <th>Date</th>
          <th>Time</th>
          <th></th>
          <th>Action</th>
        </tr>
      </table>
      <table>
        <tr className='rows head'>
          <td>3/14/25</td>
          <td>User logged in</td>
          <td>11:57:41</td>
          <td></td>
          <td></td>
        </tr>

      </table>

      <button className="done-buttono">DONE</button>
    </div>

    </>

  )
}

export default Activitylog