import {useNavigate} from 'react-router-dom' 



function ResetDBPage({backendURL}) {

    const navigate = useNavigate();

    const handleReset = async () => {
        try {
            const response = await fetch(`${backendURL}/reset`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                window.alert('The database has been reset.')

                navigate('/')


            } else {
                window.alert('Failed to reset the database.');
            }
        } catch (error) {
            console.error('Error in resetting the database.', error);
            window.alert('An error has occured while resetting the database.');
        }
    };


    return (
        <>
            <div>
                <h1 className="h1_reset">Are You Sure You Want to Reset This Database?</h1>
                <h3 className="h3_reset">this action cannot be undone</h3>
            </div>

            <div className="resetContainer">
                <button id="yes_reset" type="button" onClick={() => handleReset()}>yes</button>
                <button id="no_reset" type="button" onClick={() => navigate('/')}>no</button>
            </div>
        </>
    )
}

export default ResetDBPage;