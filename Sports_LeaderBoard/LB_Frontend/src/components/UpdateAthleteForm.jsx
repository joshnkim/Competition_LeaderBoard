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
        const athlete = athletes.find(athlete => athlete.AthleteID === parseInt(selectedID)) // use this to get the name of athlete
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
            <h2 className='manageLabel'>Update an Athlete</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label htmlFor="update_athlete_select">Select Athlete:</label>
                    <select className='athleteSelect' id="update_athlete_select" value={selectedID} onChange={handleSelect}>
                        <option value="">-- Choose Athlete --</option>
                        {athletes.map((a) => (
                            <option key={a.AthleteID} value={a.AthleteID}>
                                {a["First Name"]} {a["Last Name"]}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedID && (
                    <>
                    <div className='formRow'>
                        <label htmlFor="update_fname">First Name:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_fname"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_lname">Last Name:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_lname"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_age">Age:</label>
                        <input className='cuFormUpdate'
                            type="number"
                            id="update_age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_gender">Gender:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className='formRow'>
                        <label htmlFor="update_country">Country:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>

                        <input className="updateSubmit" type="submit" value="Update Athlete" />

                    </>
                )}
            </form>
        </>
    );
};

export default UpdateAthleteForm;