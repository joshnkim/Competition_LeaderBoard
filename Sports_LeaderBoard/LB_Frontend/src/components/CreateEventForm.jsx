import {useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';

const CreateEventForm = ({ backendURL, refreshData }) => {
   
    const navigate = useNavigate();
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
                window.alert(`Event '${formData.type} in ${formData.location} on ${formData.date}' was created successfully.`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to create event');
            }

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <>
          <h2 className='manageLabel' >Create an Event</h2>
          <form className="cuForm" onSubmit={handleSubmit}>

          <div className='formRow'> 
            <label htmlFor="date" className='text'>Date: </label>
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
            <label htmlFor="location" className='text'>Location: </label>
            <input className='cuFormInput'
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
    
          <div className='formRow'>
            <label htmlFor="type" className='text'>Type: </label>
            <input className='cuFormInput'
              type="text"
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
    
            <input type="submit" className="submit" value="Create Event" />
          </form>
        </>
      );
};

export default CreateEventForm;