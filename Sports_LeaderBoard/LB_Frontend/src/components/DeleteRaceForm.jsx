import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteRaceForm = ({ races = [], backendURL, refreshData }) => {

    const navigate = useNavigate();

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
                setSelectedID('');
                window.alert(`Race ${selectedID} was deleted successfully.`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to delete race');
            }

        } catch (error) {
            console.error('Error deleting race:', error);
        }
    };

    return (
        <>
            <h2 className='manageLabel'>Delete a Race</h2>
            <form className="cuForm" onSubmit={(e) => e.preventDefault()}>
                <div className='formRow'>
                    <label htmlFor="delete_race_select">Select Race:</label>
                    <select className='select'
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
                </div>

                <br />
                <button type="button" onClick={handleDelete} disabled={!selectedID} className='deleteButton'>Delete Race</button>
      
            </form>
        </>
    )

};

export default DeleteRaceForm;