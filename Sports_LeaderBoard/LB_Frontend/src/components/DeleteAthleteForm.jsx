import ViewAthletesPage from "../pages/ViewAthletesPage";
import { useState } from "react";

const DeleteAthleteForm = ({ athletes, backendURL, refreshData }) => {
    
    const [selectedID, setSelectedID] = useState('');

    const handleSelect = (e) => {
        setSelectedID(e.target.value);
    };
    
    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this athlete?");
        if (!confirm) return;

        try {
            const response = await fetch(`${backendURL}/athletes/${rowObject.AthleteID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                refreshData();
            } else {
                console.error('Failed to delete athlete');
            }
        } catch (error) {
            console.error('Error deleting athlete:', error);
        }
    };

    return (
        <>
            <h2>Delete an Athlete</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="delete_athlete_select">Select Athlete:</label>
                <select id="delete_athlete_select" value={selectedID} onChange={handleSelect}>
                    <option value="">-- Choose Athlete --</option>
                    {athletes.map((a) => (
                        <option key={a.AthleteID} value={a.AthleteID}>
                            {a.FName} {a.LName}
                        </option>
                    ))}
                </select>

                <br />
                <button type="button" onClick={handleDelete} disabled={!selectedID}>Delete Athlete</button>
      
            </form>
        </>
    );
};

export default DeleteAthleteForm;