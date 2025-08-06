import { useState, useEffect } from "react";

const CreateRaceForm = ({backendURL, refreshData}) => {
    const [formData, setFormData] = useState({
        date: '',
        discipline: '',
        distance: '',
        eventID: ''
    });

    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchEvents = async() => {
        try {
          const response = await fetch(`${backendURL}/events`);
          const data = await response.json();
          setEvents(data.events || data); 

        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }, [backendURL]);


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/races`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({Date: '', Discipline: '', Distance: ''});
                refreshData();

            } else {
                console.error('Failed to create race');
            }
        } catch (error) {
            console.error('Error creating race:', error);
        }
    };

    return(
        <>
            <h2 className='manageLabel'>Create a Race</h2>
            <form className="cuForm" onSubmit={handleSubmit}>
            <div className='formRow'>
                <label htmlFor="eventID" className='text'>Event:</label>
                <select className="createSelect"
                name="eventID"
                id="eventID"
                value={formData.eventID}
                onChange={handleChange}
                required
                >
                <option value="">--Select an Event--</option>
                {events.map((event) => (
                    <option key={event.EventID} value={event.EventID}>
                    {`${event.Date?.split("T")[0]} - ${event.Location} (${event.Type})`}
                    </option>
                ))}
                </select>
            </div>

            <div className='formRow'>
                <label htmlFor="Date" className='text'>Date:</label>
                <input className='cuFormInput'
                    type="datetime-local"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='formRow'>
                <label htmlFor="Discipline" className='text'>Discipline:</label>
                <input className='cuFormInput'
                    type="text"
                    name="discipline"
                    id="discipline"
                    value={formData.discipline}
                    onChange={handleChange}
                    required
                /> 
            </div>   

            <div className='formRow'>
                <label htmlFor="Distance" className='text'>Distance:</label>
                <input className='cuFormInput'
                    type="text"
                    name="distance"
                    id="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                />  
            </div>

                <input className="submit" type="submit" value="Create Race" />
            </form>
        </>
    );

    
};

export default CreateRaceForm;