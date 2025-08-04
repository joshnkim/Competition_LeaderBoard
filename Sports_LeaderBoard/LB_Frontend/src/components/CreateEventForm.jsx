import {useState, useEffect} from 'react'; 

const CreateEventForm = ({ backendURL, refreshData }) => {
    const [formData, setFormData] = useState({
        date: '',
        location: '', 
        type: '',
        eventID: ''
    });


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendURL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({ date: '', location: '', type: ''});
                refreshData();

            } else {
                console.error('Failed to create event');
            }

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <>
          <h2>Create an Event</h2>
          <form className="cuForm" onSubmit={handleSubmit}>
            <label htmlFor="date">Date:</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
  
    
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
    
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
    
            <input type="submit" value="Create Event" />
          </form>
        </>
      );
};

export default CreateEventForm;