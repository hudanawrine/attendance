import React from 'react'
import { useNavigate } from 'react-router-dom'


const Edit = () => {
    const [FirstName, setFirstName] = useState("")
        const [LastName, setLastName] = useState("")
        const [Age, setAge] = useState("")
        const [ContactNumber, setContactNumber] = useState("")
        const [Email, setEmail] = useState("")
        const [Address, setAddress] = useState("")
        const [Designation, setDesignation] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        const navigate = useNavigate()
    
        const postEmp = async (e) => {
            e.preventDefault();
            setIsLoading(true);


             try {
            const emp = await axios.post('http://localhost:4000/', { 
                FirstName, 
                LastName, 
                Age: parseInt(Age), 
                ContactNumber, 
                Email, 
                Designation,
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
                setDesignation("");
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
    <div>
      <div className='container admin-form'>
            <div className='text-center mb-5'>
                <label className='register'>Register New Employee</label>
            </div>
            <form action="" method="post" onSubmit={editemp}>
                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-text'>FIRST NAME *</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
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
                    <label className='col-sm-4 col-form-label label-text'>LAST NAME *</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
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
                    <label className='col-sm-4 col-form-label label-text'>AGE *</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
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
                    <label className='col-sm-4 col-form-label label-text'>CONTACT NUMBER *</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
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
                    <label className='col-sm-4 col-form-label label-text'>EMAIL *</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
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
                    <label className='col-sm-4 col-form-label label-text'>DESIGNATION</label>
                    <div className='col-sm-8'>
                        <input 
                            className='form-control input-text' 
                            style={{ width: '60%' }} 
                            type='text' 
                            placeholder='Enter Designation' 
                            value={Designation} 
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-text'>COMPLETE ADDRESS *</label>
                    <div className='col-sm-8'>
                        <textarea 
                            className='form-control input-text' 
                            style={{ width: '60%' }} 
                            placeholder='Enter Complete address' 
                            value={Address} 
                            onChange={(e) => setAddress(e.target.value)}
                            rows="3"
                            required
                        />
                    </div>
                </div>

                <div className='form-group row mb-4'>
                    <label className='col-sm-4 col-form-label label-text'>FACE PICTURE</label>
                    <div className='col-sm-8'>
                        <input className='form-control-file upload-input' type='file' accept="image/*" />
                    </div>
                </div>

                <div className=''>
                    <div className=''>
                        <button 
                            className='done-button' 
                            type='submit' 
                            disabled={isLoading}
                        >
                            {isLoading ? 'Edited' : 'Create Edit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )

}

export default Edit
