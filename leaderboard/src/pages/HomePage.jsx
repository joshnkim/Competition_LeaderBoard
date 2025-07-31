import Header from '../components/header'
import {useNavigate} from 'react-router-dom' 


function HomePage() {
    const navigate = useNavigate();


    return(
        <>
        <div>
            <Header />   
        </div>

        <div className='HomeButtons'>
            <button id="ManageEvents" type="button" onClick={() => navigate('/manage_events')}>Manage Events</button>
            <button id="ManageRaces" type="button" onClick={() => navigate('/manage_races')}>Manage Races</button>
            <button id="ManageAthletes" type="button" onClick={() => navigate('/manage_athletes')}>Manage Athletes</button>
            <button id="ViewEvents" type="button" onClick={() => navigate('/view_events')}>View All Events</button>
            <button id="ViewRaces" type="button" onClick={() => navigate('/view_races')}>View All Races</button>
            <button id="ViewAthletes" type="button" onClick={() => navigate('/view_athletes')}>View All Athletes</button>
        </div>
        </>
    )
}




export default HomePage;
