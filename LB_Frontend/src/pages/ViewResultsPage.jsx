import { useEffect, useState } from "react";
import Table from "../components/Table";
import Footer from "../components/Footer";

function ViewResultsPage({backendURL}) {
    const [results, setResults] = useState([]);
    
    const fetchResults = async () => {
        try {
            const res = await fetch(`${backendURL}/results`);
            const data = await res.json();
            setResults(data.results || []);

        } catch (err) {
            console.error("Failed to fetch results:", err);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [])


    const resultColumns = [
        "AthleteID",
        "Athlete Name", // athlete name has been concatenated with the GET SQL query
        "Race",
        "Time", 
        "Rank",
        "ResultID"
    ];


    return (
        <>
            <div>
                <h1>All Results:</h1>
                <Table columns={resultColumns} data={results} />
            </div>
            <br></br>
            <div>
                <p>note: functionality for organizing results via event or race will be available soon</p>
            </div>
            <Footer />
        </>
    )

}



export default ViewResultsPage