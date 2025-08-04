import {useState} from 'react'; 

const DeleteEventForm = ({events, backendURL, refreshData}) => {
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
                refreshData();

            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <>
          <h2>Delete Event</h2>
          <form className="cuForm" onDelete={handleDelete}>
            <label htmlFor="delete_event_select">Select Event to Delete:</label>
            <select
              id="delete_event_select"
              value={selectedID}
              onChange={(e) => setSelectedID(e.target.value)}
              required
            >
              <option value="">-- Choose Event --</option>
              {events.map((ev) => (
                <option key={ev.EventID} value={ev.EventID}>
                  {`[${ev.EventID}] ${ev.Date} - ${ev.Location}`}
                </option>
              ))}
            </select>
      
            <button onClick={handleDelete} disabled={!selectedID}>
              Delete Event
            </button>
          </form>
        </>
      );
}

export default DeleteEventForm;