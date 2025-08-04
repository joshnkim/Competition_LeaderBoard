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
            <h2>Update a Result</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="update_result_select">Select Result:</label>
                <select id="update_result_select" value={selectedID} onChange={handleSelect}>
                    <option value="">-- Choose Result --</option>
                    {results.map((r) => (
                        <option key={r.ResultID} value={r.ResultID}>
                            {r.name} {r.race}
                        </option>
                    ))}
                </select>

                {selectedID && (
                    <>
                        <label>Athlete Name:</label>
                        <input
                            type="text"
                            value={athleteName} //possibly add a race here 
                            disabled
                        />

                        <label htmlFor="update_race">Race:</label>
                        <input
                            type="text"
                            id="update_race"
                            name="Race"
                            value={formData.Race}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="update_time">Time:</label>
                        <input
                            type="text"
                            id="update_time"
                            name="Time"
                            value={formData.Tme}
                            onChange={handleChange}
                            required
                        />


                        <label htmlFor="update_rank">Rank:</label>
                        <input
                            type="text"
                            id="update_rank"
                            name="Rank"
                            value={formData.Rank}
                            onChange={handleChange}
                            required
                        />

                 
                        <input type="submit" value="Update Athlete" />

                    </>
                )}
            </form>
        </>
    );
};

export default UpdateResultForm;