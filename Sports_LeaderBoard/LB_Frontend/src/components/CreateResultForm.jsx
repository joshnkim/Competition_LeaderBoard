import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const CreateResultForm = ({backendURL, refreshData}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        athleteID: '',
        raceID: '',
        time: '', 
        raceRank: ''
    });

    const [athletes, setAthletes] = useState([]);;
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const res = await fetch(`${backendURL}/athletes`);
                const data = await res.json();
                setAthletes(data.athletes || data); //changed from [] to data

            } catch (err) {
                console.error('Failed to fetch athletes:', err);
            }
        };

        const fetchRaces = async () => {
            try {
                const res = await fetch(`${backendURL}/races`);
                const data = await res.json();
                setRaces(data.races || data);

            } catch (err) {
                console.error('Failed to fetch races:', err);
            }
        };

        fetchAthletes();
        fetchRaces();
    }, [backendURL]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const athlete = athletes.find(athlete => athlete.AthleteID === parseInt(formData.athleteID)) // use this to get the name of athlete

        try {
            const response = await fetch(`${backendURL}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({ athleteID: '', raceID: '', time: '', raceRank: ''});
                window.alert(`Result for athlete ${athlete["First Name"]} ${athlete["Last Name"]} was created successfully`)
                refreshData();
                navigate('/')

            } else {
                console.error('Failed to create result');
            }

        } catch (error) {
            console.error('Error creating result:', error);
        }
    };

    return (
        <>
            <h2 className='manageLabel'>Create a Result</h2>
            <p className='note'>Note: to create a result, make sure the race exists, or else the race must be created first</p>

            <form className="cuForm" onSubmit={handleSubmit}>
                <div className='formRow'>
                    <label htmlFor="athleteID">Athlete:</label>
                    <select className='createSelect'
                        name="athleteID"
                        id="athleteID"
                        value={formData.athleteID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--Select an Athlete--</option>
                        {athletes.map((a) => (
                            <option key={a.AthleteID} value={a.AthleteID}>
                                {a["First Name"]} {a["Last Name"]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='formRow'>
                    <label htmlFor="raceID">Race:</label>
                    <select className='createSelect' 
                        name="raceID"
                        id="raceID"
                        value={formData.raceID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--Select a Race--</option>
                        {races.map(r => (
                            <option key={r.RaceID} value={r.RaceID}>
                                {r.Discipline} {r.Distance} km
                            </option>
                        ))}
                    </select>
                </div>

                <div className='formRow'>
                    <label htmlFor="time">Time (HH:MM:SS):</label>
                    <input className='cuFormInput'
                        type="text"
                        name="time"
                        id="time"
                        placeholder="00:30:00"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='formRow'>
                    <label htmlFor="raceRank">Rank:</label>
                    <input className='cuFormInput'
                        type="text"
                        name="raceRank"
                        id="raceRank"
                        min="1"
                        value={formData.raceRank} // changed from time 
                        onChange={handleChange}
                        required
                    />
                </div>

                <input className="submit" type="submit" value="Create Result" />
            </form>
        </>
    )
}

export default CreateResultForm;