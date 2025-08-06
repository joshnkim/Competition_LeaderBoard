import {useState, useEffect} from 'react'; 
import CreateEventForm from '../components/CreateEventForm';
import DeleteEventForm from '../components/DeleteEventForm';
import Footer from '../components/Footer';

function ManageEventsPage({ backendURL }) {
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const response = await fetch(`${backendURL}/events`);
            const data = await response.json();
            setEvents(data.events || data);

        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <div>
                <h1 className='h1_title'>Manage Events</h1>
                <div className="createForm">
                    <CreateEventForm backendURL={backendURL} refreshData={getEvents} />
                </div>
         
                <div className='deleteForm'>
                    <DeleteEventForm backendURL={backendURL} refreshData={getEvents} events={events} />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}


export default ManageEventsPage;