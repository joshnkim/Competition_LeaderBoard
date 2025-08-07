
// import Header from '../components/header'
import {useNavigate} from 'react-router-dom' 
import React from 'react';


function HomePage() {
    const navigate = useNavigate();


    return(
        <>
        <div>
            {/* <Header />    */}
        </div>
        <div className='page-content'>
            <div className='Button-Container'>
                <div className='HomeButtons'>
                    <button id="ViewEvents" type="button" onClick={() => navigate('/view_events')}>View All Events</button>
                    <button id="ViewRaces" type="button" onClick={() => navigate('/view_races')}>View All Races</button>
                    <button id="ViewAthletes" type="button" onClick={() => navigate('/view_athletes')}>View All Athletes</button>
                    <button id="ViewResults" type="button" onClick={() => navigate('/view_results')}>View All Results</button>
                    <button id="ManageEvents" type="button" onClick={() => navigate('/manage_events')}>Manage Events</button>
                    <button id="ManageRaces" type="button" onClick={() => navigate('/manage_races')}>Manage Races</button>
                    <button id="ManageAthletes" type="button" onClick={() => navigate('/manage_athletes')}>Manage Athletes</button>
                    <button id="ManageResults" type="button" onClick={() => navigate('/manage_results')}>Manage Results</button>           
                </div>

                <div className='resetButton'>
                    <button id="ResetDB" type="button" onClick={() => navigate('/reset_database')}>Reset Database</button>
                </div>
            </div>
        </div>
        </>
    )
}




export default HomePage;
