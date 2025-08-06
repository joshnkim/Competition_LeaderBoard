import { useEffect, useState } from 'react';
// import CreateRaceForm from '../components/CreateRaceForm';
// import DeleteRaceForm from '../components/DeleteRaceForm';
// These should be in the manage races page
import Table from '../components/Table';
import Footer from '../components/Footer';

const ViewRacesPage = ({ backendURL }) => {
    const [races, setRaces] = useState([]);

    const refreshRaces = async () => {
        try {
            const response = await fetch(`${backendURL}/races`);
            const data = await response.json();
            setRaces(data.races || []);  // make sure data shape matches your backend
        } catch (error) {
            console.error("Failed to fetch races:", error);
        }
    };

    useEffect(() => {
        refreshRaces();
    }, []);

    const columns = ["RaceID", "EventID", "Discipline", "Distance"];

    return (
        <>
        <div>
            <h1 className='h1_title'>All Races</h1>

            <Table className="Table"
                columns={columns}
                data={races}
            />
        </div>

        <div>
            <Footer />
        </div>
        </>
    );
};

export default ViewRacesPage;