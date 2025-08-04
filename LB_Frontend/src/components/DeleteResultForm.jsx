import {useState} from 'react';

const DeleteResultForm = ({ results = [], backendURL, refreshData }) => {

    const [selectedID, setSelectedID] = useState('');

    const handleSelect = (e) => {
        setSelectedID(e.target.value);
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this result?")
        if (!confirm) return;

        try {
            const response = await fetch(`${backendURL}/results/${selectedID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                refreshData();

            } else {
                console.error('Failed to delete result');
            }

        } catch (error) {
            console.error('Error deleting result:', error);
        }
    };

    return (
        <>
            <h2>Delete a Result</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="delete_result_select">Select Result:</label>
                <select 
                    id="delete_result_select" 
                    value={selectedID} 
                    onChange={(e) => setSelectedID(e.target.value)}
                    required
                >
                    <option value="">-- Choose Result --</option>
                    {results.map((r) => (
                        <option key={r.ResultID} value={r.ResultID}>
                            {`[${r.name}] - ${r.Race} - ${r.Time} - ${r.rank}`}
                        </option>
                    ))}
                </select>

                <br />
                <button type="button" onClick={handleDelete} disabled={!selectedID}>Delete Result</button>
      
            </form>
        </>
    )

};

export default DeleteResultForm;