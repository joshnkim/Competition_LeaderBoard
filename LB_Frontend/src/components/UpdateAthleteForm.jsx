import { useState } from 'react';


const UpdateAthleteForm = ({ athletes, backendURL, refreshData }) => {
    const [selectedID, setSelectedID] = useState('');
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        gender: '',
        country: ''
    });

    const handleSelect = (e) => {
        const athleteID = e.target.value;
        setSelectedID(athleteID);

        const selectedAthlete = athletes.find(a => a.AthleteID.toString() === athleteID);
        if (selectedAthlete) {
            setFormData({
                fname: selectedAthlete.fname || '',
                lname: selectedAthlete.lname || '',
                age: selectedAthlete.age || '',
                gender: selectedAthlete.gender || '',
                country: selectedAthlete.country || ''
            });
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendURL}/athletes/${selectedID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSelectedID('');
                setFormData({ fname: '', lname: '', age: '', gender: '', country: '' });
                refreshData();
            } else {
                console.error('Failed to update athlete');
            }
        } catch (error) {
            console.error('Error updating athlete:', error);
        }
    
    };

    return (
        <>
            <h2>Update an Athlete</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="update_athlete_select">Select Athlete:</label>
                <select id="update_athlete_select" value={selectedID} onChange={handleSelect}>
                    <option value="">-- Choose Athlete --</option>
                    {athletes.map((a) => (
                        <option key={a.AthleteID} value={a.AthleteID}>
                            {a.FName} {a.LName}
                        </option>
                    ))}
                </select>

                {selectedID && (
                    <>
                        <label htmlFor="update_fname">First Name:</label>
                        <input
                            type="text"
                            id="update_fname"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="update_lname">Last Name:</label>
                        <input
                            type="text"
                            id="update_lname"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="update_age">Age:</label>
                        <input
                            type="number"
                            id="update_age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />


                        <label htmlFor="update_gender">Gender:</label>
                        <input
                            type="text"
                            id="update_gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="update_country">Country:</label>
                        <input
                            type="text"
                            id="update_country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />

                        <input type="submit" value="Update Athlete" />

                    </>
                )}
            </form>
        </>
    );
};

export default UpdateAthleteForm;