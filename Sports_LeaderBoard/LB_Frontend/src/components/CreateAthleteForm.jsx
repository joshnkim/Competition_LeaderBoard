import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const CreateAthleteForm = ({ backendURL, refreshData }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        gender: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/athletes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({ fname: '', lname: '', age: '', gender: '', country: '' });
                window.alert(`Athlete ${formData.fname} ${formData.lname} was created successfully.`)
                refreshData();
                navigate('/')

                
            } else {
                console.error('Failed to create athlete');
            }
        } catch (error) {
            console.error('Error creating athlete:', error);
        }
    };

    return (
        <>
            <h2 className='manageLabel'>Create an Athlete</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label htmlFor="First_name">First Name:</label>
                    <input className='cuFormInput'
                        type="text"
                        name="fname"
                        id="name"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='formRow'>
                    <label htmlFor="Last_name">Last Name:</label>
                    <input className='cuFormInput'
                        type="text"
                        name="lname"
                        id="name"
                        value={formData.lname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='formRow'>  
                    <label htmlFor="age">Age:</label>
                    <input className='cuFormInput'
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='formRow'> 
                    <label htmlFor="gender">Gender:</label>
                    <input className='cuFormInput'
                        type="text"
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='formRow'> 
                    <label htmlFor="country">Country:</label>
                    <input className='cuFormInput'
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <input className="submit" type="submit" value="Create Athlete" />
            </form>
        </>
    );
};

export default CreateAthleteForm;