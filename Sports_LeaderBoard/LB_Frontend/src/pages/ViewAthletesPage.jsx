import { useState, useEffect } from 'react';
// import TableRow from '../components/TableRow';          // Adapt if needed
// import CreateAthleteForm from '../components/CreateAthleteForm.jsx';  // Create this component
// import UpdateAthleteForm from '../components/UpdateAthleteForm';  // Create this component

// the above imports should be in the manage athletes page.

import Footer from '../components/Footer';



function ViewAthletesPage({ backendURL }) {

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


return (
    <>
      <div>
        <h1 className='h1_title'>View All Athletes</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            {athletes.length > 0 && Object.keys(athletes[0]).map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {athletes.map((athlete, i) => (
            <tr key={i}>
                {Object.values(athlete).map((value, j) => (
                    <td key={j}>{value}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Footer />
      </div>

    </>
  );
}




export default ViewAthletesPage;