
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
                    <button id="ManageEvents" type="button" onClick={() => navigate('/manage_events')}>manage events</button>
                    <button id="ManageRaces" type="button" onClick={() => navigate('/manage_races')}>manage races</button>
                    <button id="ManageAthletes" type="button" onClick={() => navigate('/manage_athletes')}>manage athletes</button>
                    <button id="ManageResults" type="button" onClick={() => navigate('/manage_results')}>manage results</button>           
                    <button id="ViewEvents" type="button" onClick={() => navigate('/view_events')}>view all events</button>
                    <button id="ViewRaces" type="button" onClick={() => navigate('/view_races')}>view all races</button>
                    <button id="ViewAthletes" type="button" onClick={() => navigate('/view_athletes')}>view all athletes</button>
                    <button id="ViewResults" type="button" onClick={() => navigate('/view_results')}>view all results</button>
                </div>
            </div>
        </div>
        </>
    )
}




export default HomePage;
