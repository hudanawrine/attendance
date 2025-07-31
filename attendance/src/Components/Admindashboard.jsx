import React from 'react';
import './Admindashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';

function Admindashboard() {
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Age, setAge] = useState("")
    const [ContactNumber, setContactNumber] = useState("")
    const [Email, setEmail] = useState("")
    const [Address, setAddress] = useState("")
    const [Course, setCourse] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const postEmp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!FirstName || !LastName || !Age || !ContactNumber || !Email || !Course || !Address) {
            alert("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        try {
            const emp = await axios.post('http://localhost:4000/', { 
                FirstName, 
                LastName, 
                Age: parseInt(Age), 
                ContactNumber, 
                Email, 
                Course,
                Address 
            });
            
            if (emp.data.status) {
                alert("Employee registered successfully! Password sent to email.");
                // Clear form
                setFirstName("");
                setLastName("");
                setAge("");
                setContactNumber("");
                setEmail("");
                setAddress("");
                setCourse("");
            } else {
                alert("Error: " + emp.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("Error sending data: " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='container admin-formm'>
            <div className='text-center mb-5'>
                <label className='registerrr'>Register New Employee</label>
            </div>
            <form action="" method="post" onSubmit={postEmp}>
                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>FIRST NAME </label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='text' 
                            placeholder='Enter Firstname' 
                            value={FirstName} 
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>LAST NAME </label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='text' 
                            placeholder='Enter Lastname' 
                            value={LastName} 
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>AGE </label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='number' 
                            placeholder='Enter age' 
                            value={Age} 
                            onChange={(e) => setAge(e.target.value)}
                            min="18"
                            max="65"
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>CONTACT NUMBER </label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='tel' 
                            placeholder='Enter Contact number' 
                            value={ContactNumber} 
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>EMAIL </label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='email' 
                            placeholder='Enter Email' 
                            value={Email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>COURSE</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            type='text' 
                            placeholder='Enter Designation' 
                            value={Course} 
                            onChange={(e) => setCourse(e.target.value)}
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-texttt'>COMPLETE ADDRESS </label>
                    <div className='col-sm-8'>
                        <textarea 
                            className='form-control input-texttt' 
                            style={{ width: '60%' }} 
                            placeholder='Enter Complete address' 
                            value={Address} 
                            onChange={(e) => setAddress(e.target.value)}
                            rows="3"
                            required
                        />
                    </div>
                </div>
{/* 
                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-text'>FACE PICTURE</label>
                    <div className='col-sm-8'>
                        <input className='form-control-file upload-input' type='file' accept="image/*" />
                    </div>
                </div> */}

                <div className=''>
                    <div className=''>
                        <button 
                            className='done-button' 
                            type='submit' 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Created' : 'Create Employee'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Admindashboard;