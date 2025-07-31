import React from 'react'
// import '../compontes/Leave_mark.css'
import '../Components/Leave_mark.css'
// import { BsSearch } from "react-icons/bs";


const Leave_mark = () => {
  return (
    <div className='EmployeesList'>
    
      <div className='table-container'>
        <table>
          <tr>
            <th className='head-2'>No.</th>
            <th className='head-2'>Name</th>
            <th className='head-2'>Contact</th>
            <th className='head-2'>Status Today</th>
          </tr>

          <tr className='dataa'>
            <td className='size'>01</td>
            <td className='size' >Joana </td>
            <td  className='size'>0909090909</td>
            <div class="dropdown">
              <button class="dropbtn">Dropdown</button>
              <div class="dropdown-content">
                <a href="#" className='present'>Present</a>
                <a href="#" className='absent'>Absent</a>
                {/* <a href="#">Link 3</a> */}
              </div>
            </div>
          </tr>

          {/* <tr className='dataa'>
            <td >02</td>
            <td >Jewel </td>
            <td >0808080808</td>
            <td ><button className='red'>Late</button></td>
          </tr>

          <tr className='dataa'>
            <td >03</td>
            <td >Aurelio </td>
            <td >0707070707</td>
            <td ><button className='black'>Absent</button></td>
          </tr>

          <tr className='dataa'>
            <td >04</td>
            <td >Angelo </td>
            <td >0606060606</td>
            <td ><button className='green'>Present</button></td>
          </tr>

          <tr className='dataa'>
            <td>05</td>
            <td>Jane</td>
            <td>0505050505</td>
            <td><button className='green'>Present</button></td>
          </tr>

          <tr className='dataa'>
            <td>06</td>
            <td>Eliza</td>
            <td>0404040404</td>
            <td><button  className='black'>Absent</button></td>
          </tr>

          <tr className='dataa'>
            <td>07</td>
            <td>Eliaz</td>
            <td>0303030303</td>
            <td><button  className='red'>Late</button></td>
          </tr>

          <tr className='dataa'>
            <td>08</td>
            <td>Moana</td>
            <td>0202020202</td>
            <td><button  className='black'>Absent</button></td>
          </tr> */}


        </table>
      </div>



    </div>
  )
}

export default Leave_mark