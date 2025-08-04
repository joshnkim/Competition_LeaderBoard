import {useState, useEffect} from 'react';

const CreateResultForm = ({backendURL, refreshData}) => {
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
                setAthletes(data.athletes || []);

            } catch (err) {
                console.error('Failed to fetch athletes:', err);
            }
        };

        const fetchRaces = async () => {
            try {
                const res = await fetch(`${backendURL}/races`);
                const data = await res.json();
                setRaces(data.races || []);

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
                refreshData();

            } else {
                console.error('Failed to create result');
            }

        } catch (error) {
            console.error('Error creating result:', error);
        }
    };

    return (
        <>
            <h2>Create a Result</h2>
            <p>Note: to create a result, make sure the race exists, or else the race must be created first</p>
            <form className="cuForm" onSubmit={handleSubmit}>
                <label htmlFor="athleteID">Athlete:</label>
                <select 
                    name="athleteID"
                    id="athleteID"
                    value={formData.athleteID}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Select an Athlete--</option>
                    {athletes.map(a => (
                        <option key={a.AthleteID} value={a.AthleteID}>
                            {a.FName} {a.LName}
                        </option>
                    ))}
                </select>

                <label htmlFor="raceID">Race:</label>
                <select 
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

                <label htmlFor="time">Time (HH:MM:SS):</label>
                <input 
                    type="text"
                    name="time"
                    id="time"
                    placeholder="00:30:00"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="raceRank">Rank:</label>
                <input 
                    type="text"
                    name="raceRank"
                    id="raceRank"
                    min="1"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />

                <input type="submit" value="Create Result" />
            </form>
        </>
    )
}

export default CreateResultForm;