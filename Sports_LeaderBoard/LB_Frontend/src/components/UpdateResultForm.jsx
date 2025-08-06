import { useState } from 'react';


const UpdateResultForm = ({ results, backendURL, refreshData }) => {
    const [selectedID, setSelectedID] = useState('');
    const [formData, setFormData] = useState({
        Race: '',
        Time: '',
        Rank: '',
    });

    const [athleteName, setAthleteName] = useState('');

    const handleSelect = (e) => {
        const resultID = e.target.value;
        setSelectedID(resultID);

        const selectedResult = results.find(r => r.ResultID.toString() === resultID);
        if (selectedResult) {
            setFormData({
                Race: selectedResult.Race || '',
                Time: selectedResult.Time || '',
                Rank: selectedResult.rank || ''
            });
            setAthleteName(selectedResult.name || '');
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
            const response = await fetch(`${backendURL}/results/${selectedID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSelectedID('');
                setFormData({ Race: '', Time: '', Rank: ''});
                refreshData();
            } else {
                console.error('Failed to update result');
            }
        } catch (error) {
            console.error('Error updating result:', error);
        }
    
    };

    return (
        <>
            <h2 className='manageLabel'>Update a Result</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label htmlFor="update_result_select">Select Result:</label>
                    <select className='resultSelect'id="update_result_select" value={selectedID} onChange={handleSelect}>
                        <option value="">-- Choose Result --</option>
                        {results.map((r) => (
                            <option key={r.ResultID} value={r.ResultID}>
                                {r.name} {r.race}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedID && (
                    <>
                    <div className='formRow'>
                        <label>Athlete Name:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            value={athleteName} //possibly add a race here 
                            disabled
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_race">Race:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_race"
                            name="Race"
                            value={formData.Race}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_time">Time:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_time"
                            name="Time"
                            placeholder="00:30:00"
                            value={formData.Tme}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='formRow'>
                        <label htmlFor="update_rank">Rank:</label>
                        <input className='cuFormUpdate'
                            type="text"
                            id="update_rank"
                            name="Rank"
                            value={formData.Rank}
                            onChange={handleChange}
                            required
                        />
                    </div>
                 
                        <input className='updateSubmit' type="submit" value="Update Athlete" />

                    </>
                )}
            </form>
        </>
    );
};

export default UpdateResultForm;