import {useState, useEffect} from 'react'; 
import CreateResultForm from '../components/CreateResultForm';
import UpdateResultForm from '../components/UpdateResultForm';
import DeleteResultForm from '../components/DeleteResultForm';
import Footer from '../components/Footer';

function ManageResultsPage({ backendURL }) {
    const [results, setResults] = useState([]);

    const getResults = async () => {
        try {
            const response = await fetch(`${backendURL}/results`);
            const data = await response.json();
            setResults(data.results || data);

        } catch (error) {
            console.error("Error fetching results:", error);
        }
    };

    useEffect(() => {
        getResults();
    }, []);

    return (
        <>
            <div>
                <h1>Create or Delete a Result</h1>
                <CreateResultForm backendURL={backendURL} refreshData={getResults} />
            </div>

            <p>or</p>

            

            <div>
                <UpdateResultForm results = {results} backendURL={backendURL} refreshData={getResults} />
                <DeleteResultForm results = {results} backendURL={backendURL} refreshData={getResults} />
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}


export default ManageResultsPage;