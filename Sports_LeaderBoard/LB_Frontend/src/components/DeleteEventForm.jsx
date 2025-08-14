import {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';


const DeleteEventForm = ({events, backendURL, refreshData}) => {
    const navigate = useNavigate();

    const [selectedID, setSelectedID] = useState(''); 
    const [formData, setFormData] = useState({
        date: '', 
        location: '', 
        type: ''
    });

    const handleSelect = (e) => {
        const eventID = e.target.value; 
        setSelectedID(eventID);

        const selectedEvent = events.find(ev => ev.EventID.toString() === eventID);
        if (selectedEvent) {
            setFormData({
                date: selectedEvent.Date || '', 
                location: selectedEvent.Location || '',
                type: selectedEvent.Type || ''
            });
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };

    const handleDelete = async(e) => {
        e.preventDefault(); 
        const confirm = window.confirm("Are you sure you want to delete this event?")
        if (!confirm) return;
        try {
            const response = await fetch(`${backendURL}/events/${selectedID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSelectedID('');
                window.alert(`Event ${selectedID} was deleted successfully.`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <>
          <h2 className='manageLabel'>Delete an Event</h2>
          <form className="cuForm" onSubmit={handleDelete}>

            <div className='formRow'> 
              <label htmlFor="delete_event_select" className="delete_label">Select Event to Delete:</label>
              <select className='select'
                id="delete_event_select"
                value={selectedID}
                onChange={(e) => setSelectedID(e.target.value)}
                required
              >
                <option value="" className='options'>-- Choose Event --</option>
                {events.map((ev) => (
                  <option key={ev.EventID} value={ev.EventID}>
                    {`[${ev.EventID}] ${ev.Date} - ${ev.Location}`}
                  </option>
                ))}
              </select>
            </div>
        
            <button onClick={handleDelete} disabled={!selectedID} className='deleteButton'>
              Delete Event
            </button>
          </form>
        </>
      );
}

export default DeleteEventForm;