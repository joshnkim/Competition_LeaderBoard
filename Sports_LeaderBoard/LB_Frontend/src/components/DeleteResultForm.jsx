import {useState} from 'react';
import { useNavigate } from "react-router-dom";

const DeleteResultForm = ({ athletes, results = [], backendURL, refreshData }) => {
    const navigate = useNavigate();
    const [selectedID, setSelectedID] = useState('');

    const handleSelect = (e) => {
        setSelectedID(e.target.value);
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this result?")
        const result = results.find((r) => r.ResultID === parseInt(selectedID)) // added this to allow for athlete name to show up in message dialogue
        const athlete = athletes.find((a) => a.AthleteID === result.AthleteID);  // added this to allow for athlete name to show up in message dialogue
        if (!confirm) return;
        
        try {
            const response = await fetch(`${backendURL}/results/${selectedID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSelectedID('')
                window.alert(`Result For athlete ${athlete["First Name"]} ${athlete["Last Name"]} was delete successfully.`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to delete result');
            }

        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    return (
        <>
            <h2 className='manageLabel'>Delete a Result</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <div className='formRow'>
                    <label htmlFor="delete_result_select">Select Result:</label>
                    <select className='select'
                        id="delete_result_select" 
                        value={selectedID} 
                        onChange={(e) => setSelectedID(e.target.value)}
                        required
                    >
                        <option value="">-- Choose Result --</option>
                        {results.map((r) => (
                            <option key={r.ResultID} value={r.ResultID}>
                                {`[${r.Name}] - ${r.Race} - ${r.Time} - ${r.Rank}`}
                            </option>
                        ))}
                    </select>
                </div>

                <br />
                <button className='deleteButton' type="button" onClick={handleDelete} disabled={!selectedID}>Delete Result</button>
      
            </form>
        </>
    )

};

export default DeleteResultForm;