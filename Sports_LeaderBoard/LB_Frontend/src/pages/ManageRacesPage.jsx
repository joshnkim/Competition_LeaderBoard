import {useState, useEffect} from 'react';
import CreateRaceForm from '../components/CreateRaceForm';
import DeleteRaceForm from '../components/DeleteRaceForm';
import Footer from '../components/Footer';

function ManageRacesPage({backendURL}) {
    const [races, setRaces] = useState([]);

    const getRaces = async () => {
        try {
            const response = await fetch(`${backendURL}/races`);
            const data = await response.json();
            setRaces(data.races || data);

        } catch (error) {
            console.error("Error fetching races:", error);
        }
    };

    useEffect(() => {
        getRaces();
    }, []);

    return (
        <>
            <div>
                <h1 className='h1_title'>Create or Delete a Race</h1>
                    <div className="createForm">
                        <CreateRaceForm backendURL={backendURL} refreshData={getRaces} />
                    </div>
                    <div className='deleteForm'>
                        <DeleteRaceForm races = {races} backendURL={backendURL} refreshData={getRaces} />
                    </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}


export default ManageRacesPage;