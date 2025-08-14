/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express();               // We need to instantiate an express object to interact with the server in our code
const PORT = 2228;     // Set a port number
const path = require('path');
const fs = require('fs');

const cors = require('cors');
app.use(cors({ credentials: true, origin: "*"}));
app.use(express.json());

// Database 
const db = require('./db-connector');


// GET
app.get('/athletes', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT AthleteID, FName AS 'First Name', LName as 'Last Name', Age, Gender, Country FROM Athletes`;
        const [athletes] = await db.query(query1);    
        res.status(200).json({ athletes });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/events', async (req, res) => {
    try {
      const query = `SELECT EventID, Date, Location, Type FROM Events`;
      const [events] = await db.query(query);
      res.status(200).json({ events });
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).send("An error occurred while fetching events.");
    }
  });

app.get('/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
      const query = `SELECT * FROM Events WHERE EventID = ?`;
      const [events] = await db.query(query, [eventId]);
  
      if (events.length === 0) {
        return res.status(404).send("Event not found");
      }
  
      res.json(events[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching event.");
    }
  });


app.get('/races', async (req, res) => {
    try {
      const query = `
        SELECT 
          Races.RaceID, 
          Races.EventID, 
          Events.Date, 
          Events.Location, 
          Events.Type, 
          Races.Discipline, 
          Races.Distance 
        FROM Races
        LEFT JOIN Events ON Races.EventID = Events.EventID
      `;
      const [races] = await db.query(query);
      res.status(200).json({ races });
    } catch (error) {
      console.error("Error fetching races:", error);
      res.status(500).send("An error occurred while fetching races.");
    }
  });



app.get('/races/:raceId', async (req, res) => {
    try {
      const raceId = req.params.raceId;
      const query = `
        SELECT 
          Races.RaceID, 
          Races.EventID, 
          Events.Date, 
          Events.Location, 
          Events.Type, 
          Races.Discipline, 
          Races.Distance 
        FROM Races
        LEFT JOIN Events ON Races.EventID = Events.EventID
        WHERE Races.RaceID = ?
      `;
      const [races] = await db.query(query, [raceId]);
  
      if (races.length === 0) {
        return res.status(404).send(`Race with RaceID ${raceId} not found.`);
      }
  
      res.status(200).json({ race: races[0] });
    } catch (error) {
      console.error("Error fetching race:", error);
      res.status(500).send("An error occurred while fetching the race.");
    }
  });

  
app.get('/events/:eventId/races', async (req, res) => {
    const eventId = req.params.eventId;
    try {
      const query =  `SELECT RaceID, Discipline, Distance FROM Races WHERE EventID = ?`;
      const [races] = await db.query(query, [eventId]);
      res.json({races})
  
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching races for event.");
    }
  });

  app.get('/results', async (req, res) => {
    try {
      const query = `
        SELECT 
	        Athletes.AthleteID, 
          CONCAT(Athletes.Fname, ' ', Athletes.Lname) AS 'Name', 
          CONCAT(Races.Discipline, ' ', Races.Distance, 'km') AS 'Race',
          Time,
          CONCAT(RaceRank,
		        CASE
			        WHEN RaceRank %100 BETWEEN 11 AND 13 THEN 'th' 				-- this covers 11, 12, and 13 which dont follow the conventional suffix rule
			        WHEN RaceRank %10 = 1 THEN 'st' 												--
              WHEN RaceRank %10 = 2 THEN 'nd'											 	--
              WHEN RaceRank %10 = 3 THEN 'rd'												-- this line and the above 2 work for numbers starting from 1-9 and 14 and on. need to add a condition for 11,12, 13
              ELSE 'th'
		        END, 
            ' place') AS 'Rank',
          ResultID
        FROM Results
        LEFT JOIN Athletes on Results.AthleteID = Athletes.AthleteID
        LEFT JOIN Races on Results.RaceID = Races.RaceID
        ORDER BY Athletes.AthleteID, RaceRank;
        `;
      const [results] = await db.query(query);
      res.status(200).json({ results });
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).send("An error occurred while fetching results.");
    }
  });
  
  app.get('/results/:resultID', async (req, res) => {
    const resultID = req.params.resultID;
    try {
      const query = `
          SELECT 
            Athletes.AthleteID,
            CONCAT(Athletes.FName, ' ', Athletes.LName) AS 'Name',
            CONCAT(Races.Discipline, ' ', Races.Distance, 'km') AS 'Race',
            Results.Time,
            CONCAT(
              Results.RaceRank,
              CASE
                WHEN Results.RaceRank % 100 BETWEEN 11 AND 13 THEN 'th'
                WHEN Results.RaceRank % 10 = 1 THEN 'st'
                WHEN Results.RaceRank % 10 = 2 THEN 'nd'
                WHEN Results.RaceRank % 10 = 3 THEN 'rd'
                ELSE 'th'
              END,
              ' place'
            ) AS 'Rank',
            Results.ResultID
            FROM Results
            LEFT JOIN Athletes ON Results.AthleteID = Athletes.AthleteID
            LEFT JOIN Races ON Results.RaceID = Races.RaceID
            WHERE Results.ResultID = ?;
        `
          const [results] = await db.query(query, [resultID]);

          if (results.length === 0) {
            return res.status(404).send("Result Not Found");
          }

          res.status(200).json({ result: results[0] });

        } catch (error) {
          console.error("Error fetching athlete results:", error);
          res.status(500).send("An error occurred while fetching athlete result.");
        }
      });









/******************************************************* RESET ROUTE ************************************************************/

//load file
async function loadSP() {
  try {
    const DDLpath = path.join(__dirname, 'SP_DDL.sql');
    const readDDL = fs.readFileSync(DDLpath, 'utf8');

    await db.query(readDDL);
    console.log("DDL script loaded successfully.");

  } catch (err) {
    console.error('Error loading procedures:', err);
  }
};

//reset functionality
app.post('/reset', async (req, res) => {
  try {
    await db.query('CALL sp_resetDB()');
    res.status(200).json({message: "The database has been reset successfully"});
  } catch (err) {
    res.status(500).send("Failed to reset database.");
  }
});
/*******************************************************************************************************************************/











/******************************************************* POST ROUTES ***********************************************************/
//POST: event 
app.post('/events', async (req, res) => {
  try {
    const { date, location, type } = req.body;

    // Basic validation
    if (!date || !location || !type) {
      return res.status(400).json({ message: 'Missing required fields: date, location, or type.' });
    }

    // Call the stored procedure
    const sql = 'CALL sp_createEvent(?, ?, ?)';
    await db.query(sql, [date, location, type]);

    res.status(201).json({ message: 'Event created successfully.' });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 




//POST: race
app.post('/races', async (req, res) => {
  try {
    const { eventID, discipline, distance } = req.body; 

    // Validation
    if (!eventID || !discipline || !distance) {
      return res.status(400).json({ message: 'Missing required fields: eventID, discipline, or distance.'})
    }

    // Call the SP
    const sql = 'CALL sp_createRace(?, ?, ?)';
    await db.query(sql, [eventID, discipline, distance]);

    res.status(201).json({ message: 'Race created successfully.'});

  } catch (err) {
    console.error('Error creating race:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
});





//POST: athlete 
app.post('/athletes', async (req, res) => {
  const { fname, lname, age, gender, country } = req.body;

  try {
    // Call the stored procedure with parameters
    await db.query('CALL sp_createAthlete(?, ?, ?, ?, ?)', [
      fname,
      lname,
      age,
      gender,
      country
    ]);

    res.status(201).json({ message: 'Athlete created successfully!' });

  } catch (error) {
    console.error("Error calling sp_createAthlete:", error); // Helpful for debugging
    res.status(500).send("An error occurred while creating the athlete.");
  }
});



//POST: result
app.post('/results', async (req, res) => {
  try {
    const { raceID, athleteID, time, raceRank } = req.body; 

    // Validation
    if (!raceID|| !athleteID || !time || !raceRank) {
      return res.status(400).json({ message: 'Missing required fields: raceID, athleteID, time, or race rank.'})
    }

    // Call the SP
    const sql = 'CALL sp_createResult(?, ?, ?, ?)';
    await db.query(sql, [raceID, athleteID, time, raceRank]);

    res.status(201).json({ message: 'Result created successfully.'});

  } catch (err) {
    console.error('Error creating result:', err);
    res.status(500).json({message: 'Internal server error.'});
  }
});
/*******************************************************************************************************************************/









/****************************************************** UPDATE ROUTES **********************************************************/
//UPDATE: athlete
app.patch('/athletes/:athleteID', async (req, res) => {
  const {fname, lname, age, gender, country} = req.body; 

  const athleteID = req.params.athleteID;
  try {
    await db.query('CALL sp_updateAthlete(?, ?, ?, ?, ?, ?)', [
      athleteID,
      fname,
      lname,
      age,
      gender,
      country
    ]);

    res.status(200).json({ message: 'Athlete updated successfully!' });

  } catch (error) {
    console.error("Error calling sp_updateAthlete:", error); // Helpful for debugging
    res.status(500).send("An error occurred while updating the athlete.");
  }
})


/*******************************************************************************************************************************/









/****************************************************** DELETE ROUTES **********************************************************/

//DELETE: event 
app.delete('/events/:eventID', async (req, res) => {
  try {
    const { eventID } = req.params; // not req.body

    // Call the stored procedure
    const sql = 'CALL sp_deleteEvent(?)';
    await db.query(sql, [eventID]);

    res.status(201).json({ message: 'Event deleted successfully.' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 


//DELETE: race 
app.delete('/races/:raceID', async (req, res) => {
  try {
    const { raceID } = req.params; 

    // Call the stored procedure
    const sql = 'CALL sp_deleteRace(?)';
    await db.query(sql, [raceID]);

    res.status(201).json({ message: 'Race deleted successfully.' });
  } catch (err) {
    console.error('Error deleting race:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 




//DELETE: race 
app.delete('/athletes/:athleteID', async (req, res) => {
  try {
    const { athleteID } = req.params; 

    // Call the stored procedure
    const sql = 'CALL sp_deleteAthlete(?)';
    await db.query(sql, [athleteID]);

    res.status(201).json({ message: 'Athlete deleted successfully.' });
  } catch (err) {
    console.error('Error deleting Athlete:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 



//DELETE: result 
app.delete('/results/:resultID', async (req, res) => {
  try {
    const { resultID } = req.params; 

    // Call the stored procedure
    const sql = 'CALL sp_deleteResults(?)';
    await db.query(sql, [resultID]);

    res.status(201).json({ message: 'Result deleted successfully.' });
  } catch (err) {
    console.error('Error deleting Result:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 
/*******************************************************************************************************************************/









/*
    LISTENER
*/

app.listen(PORT, async function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')

    await loadSP();
});