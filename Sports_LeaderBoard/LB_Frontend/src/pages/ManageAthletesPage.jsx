import {useState, useEffect} from 'react';
import CreateAthleteForm from '../components/CreateAthleteForm';
import UpdateAthleteForm from '../components/UpdateAthleteForm';
import DeleteAthleteForm from '../components/DeleteAthleteForm.jsx';
import Footer from '../components/Footer.jsx';


const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this athlete?");
    if (!confirm) return;

    try {
        const response = await fetch(`${backendURL}/athletes/${selectedID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            refreshData();
        } else {
            console.error('Failed to delete athlete');
        }
    } catch (error) {
        console.error('Error deleting athlete:', error);
    }
};


function ManageAthletesPage({backendURL}) {
    const [athletes, setAthletes] = useState([]);

    const getAthletes = async () => {
        try{
            const response = await fetch(`${backendURL}/athletes`);
            const data = await response.json();
            setAthletes(data.athletes || data);  // Adjust depending on your backend response shape
    }   catch (error) {
            console.error("Error fetching athletes:", error);
    }

}

useEffect(() => {
    getAthletes();
}, []);

return(
    <>
        <div>
            <h1>Create, Update, or Delete Athletes</h1>

            <CreateAthleteForm backendURL={backendURL} refreshData={getAthletes} />
            <UpdateAthleteForm athletes={athletes} backendURL={backendURL} refreshData={getAthletes} />
            <p>or</p>
            <DeleteAthleteForm athletes={athletes} backendURL={backendURL} refreshData={getAthletes} />

        </div>

        <div>
            <Footer />
        </div>
    </>
);
};

export default ManageAthletesPage;