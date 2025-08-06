import { useEffect, useState } from 'react';
import Table from '../components/Table';  // reuse your Table component
import Footer from '../components/Footer';

function ViewEventsPage({ backendURL }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [races, setRaces] = useState([]);

  // Fetch all events on load
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${backendURL}/events`);
      const data = await res.json();
      setEvents(data.events || data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  // Fetch races for selected event
  const fetchRacesForEvent = async (eventId) => {
    try {
      const res = await fetch(`${backendURL}/events/${eventId}/races`);
      const data = await res.json();
      const racesData = (data.races || data || []).map(race => ({
        RaceID: race.RaceID,
        Discipline: race.Discipline, 
        Distance: race.Distance
      }));
      setRaces(racesData);
    } catch (err) {
      console.error("Failed to fetch races for event:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // When selectedEventId changes, fetch races for that event
  useEffect(() => {
    if (selectedEventId) {
      fetchRacesForEvent(selectedEventId);
    } else {
      setRaces([]);
    }
  }, [selectedEventId]);

  const eventColumns = ["EventID", "Date", "Location", "Type"];
  const raceColumns = ["RaceID", "Discipline", "Distance"];

  return (
    <>
      <div>
        <h1 className='h1_title'>All Events</h1>
        <Table className="table"
          columns={eventColumns}
          data={events}
          // Render a button on each row to select event and show races
          children={(row) => (
            <button className="eventButton" onClick={() => setSelectedEventId(row.EventID)}>
              View Races
            </button>
          )}
        />

        {selectedEventId && (
          <>
            <h2>Races for Event ID: {selectedEventId}</h2>
            <Table columns={raceColumns} data={races} />
            
          </>
        )}
      </div>

      <div>
        <Footer />
      </div>
      </>
  );
}

export default ViewEventsPage;