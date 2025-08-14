import ViewAthletesPage from "../pages/ViewAthletesPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAthleteForm = ({ athletes, backendURL, refreshData }) => {
    const navigate = useNavigate();
    const [selectedID, setSelectedID] = useState('');

    const handleSelect = (e) => {
        setSelectedID(e.target.value);
    };
    
    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this athlete?");
        const athlete = athletes.find(athlete => athlete.AthleteID === parseInt(selectedID)) // use this to get the name of athlete
        if (!confirm) return;

        try {
            const response = await fetch(`${backendURL}/athletes/${selectedID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSelectedID('')
                window.alert(`Athlete ${athlete["First Name"]} ${athlete["Last Name"]} was deleted successfully.`)
                refreshData();
                navigate('/')
            } else {
                console.error('Failed to delete athlete');
            }
        } catch (error) {
            console.error('Error deleting athlete:', error);
        }
    };

    return (
        <>
            <h2 className='manageLabel'>Delete an Athlete</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <div className='formRow'>
                    <label htmlFor="delete_athlete_select">Select Athlete:</label>
                    <select className="select" id="delete_athlete_select" value={selectedID} onChange={handleSelect}>
                        <option value="">-- Choose Athlete --</option>
                        {athletes.map((a) => (
                            <option key={a.AthleteID} value={a.AthleteID}>
                                {a["First Name"]} {a["Last Name"]}
                            </option>
                        ))}
                    </select>
                </div>

                <br />
                <button type="button" onClick={handleDelete} disabled={!selectedID} className='deleteButton'>Delete Athlete</button>
      
            </form>
        </>
    );
};

export default DeleteAthleteForm;