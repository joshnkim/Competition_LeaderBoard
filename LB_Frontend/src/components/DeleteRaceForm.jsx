import {useState} from 'react';

const DeleteRaceForm = ({ races = [], backendURL, refreshData }) => {

    const [selectedID, setSelectedID] = useState('');

    const handleSelect = (e) => {
        setSelectedID(e.target.value);
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this race?")
        if (!confirm) return;

        try {
            const response = await fetch(`${backendURL}/races/${selectedID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                refreshData();

            } else {
                console.error('Failed to delete race');
            }

        } catch (error) {
            console.error('Error deleting race:', error);
        }
    };

    return (
        <>
            <h2>Delete a Race</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="delete_race_select">Select Race:</label>
                <select 
                    id="delete_race_select" 
                    value={selectedID} 
                    onChange={(e) => setSelectedID(e.target.value)}
                    required
                >
                    <option value="">-- Choose Race --</option>
                    {races.map((ra) => (
                        <option key={ra.RaceID} value={ra.RaceID}>
                            {`[${ra.Type}] - ${ra.Discipline} - ${ra.Distance}km`}
                        </option>
                    ))}
                </select>

                <br />
                <button type="button" onClick={handleDelete} disabled={!selectedID}>Delete Race</button>
      
            </form>
        </>
    )

};

export default DeleteRaceForm;