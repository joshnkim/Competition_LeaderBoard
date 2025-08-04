import { useState } from 'react';

const CreateAthleteForm = ({ backendURL, refreshData }) => {
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
                refreshData();
            } else {
                console.error('Failed to create athlete');
            }
        } catch (error) {
            console.error('Error creating athlete:', error);
        }
    };

    return (
        <>
            <h2>Create an Athlete</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="First_name">First Name:</label>
                <input
                    type="text"
                    name="fname"
                    id="name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="Last_name">Last Name:</label>
                <input
                    type="text"
                    name="lname"
                    id="name"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="gender">Gender:</label>
                <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                />

                <input type="submit" value="Create Athlete" />
            </form>
        </>
    );
};

export default CreateAthleteForm;