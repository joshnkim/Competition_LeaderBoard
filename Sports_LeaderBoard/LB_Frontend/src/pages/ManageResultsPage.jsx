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
            <div className='page-content'>
                <h1 className='h1_title'>Create or Delete a Result</h1>
                    <div className='createForm'>
                    <CreateResultForm backendURL={backendURL} refreshData={getResults} />
                    </div>


                    <div className='updateForm'>
                        <UpdateResultForm results = {results} backendURL={backendURL} refreshData={getResults} />
                    </div>
                    <div className='deleteForm'>
                        <DeleteResultForm results = {results} backendURL={backendURL} refreshData={getResults} />
                    </div>

                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}


export default ManageResultsPage;