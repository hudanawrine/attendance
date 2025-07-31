
import React, { useEffect, useState } from 'react';
import './EmployeesList.css'
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';



const EmployeesList = () => {
  const [lists, setlists] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  const navigate = useNavigate();


  useEffect(() => {
    const admin = localStorage.getItem("adminData")
    if (!admin) {
      window.location.href = "/admin"
    }

    getLists()
  }, [])



  const getLists = async () => {
    const response = await axios.get('http://localhost:4000/list')
    console.log(response.data)
    setlists(response.data)
    // setlists(response.data)
  }

  const handleRowClick = (employeeId) => {
    // console.log("Row clicked:", employee);
    // You can redirect, open modal, or do anything here
    navigate(`/employee/${employeeId}`);
  };


  const delEmp = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/employeeDelete/${id}`)
      console.log('Deleted:', response.data)
      getLists();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

const filteredList = lists.filter(item =>
  item.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.LastName?.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='EmployeesListt'>


      <div className='input-wrapper'>
        <span className='icon1'><BsSearch /></span>
        <input
          className='inputt'
          placeholder='Search employee...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
      <div className='image-style'>

        <h1 className='headline'>Full Employee List</h1>
      </div>
      <div className='table-containerr '>
        <table>
          <thead>
            <tr className='head-2'>
              <th className='head-1'>No.</th>
              <th>Name</th>
              <th>Contact</th>
              {/* <th>Status Today</th> */}
            </tr>
          </thead>
          <tbody>
           {filteredList.map((items, index) => (
              <tr key={items._id || index}
                className='dataa clickable-row'
                onClick={() => handleRowClick(items._id)}>
                <td>{index + 1}</td>
                <td>{items.FirstName}</td>
                <td>{items.ContactNumber}</td>
                <td>
                  {/* <button className='greenn'>Present</button> */}
                  <button className='redd' onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Are you sure you want to delete this employee?")) {
                      delEmp(items._id);
                    }
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>



    </div>
  )
}

export default EmployeesList