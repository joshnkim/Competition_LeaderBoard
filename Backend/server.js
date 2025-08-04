/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express();               // We need to instantiate an express object to interact with the server in our code
const PORT = 2229;     // Set a port number

const cors = require('cors');
app.use(cors({ credentials: true, origin: "*"}));
app.use(express.json());

// Database 
const db = require('./db-connector');

//bullshit
app.get('/athletes', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT AthleteID, FName, LName, Age, Gender, Country FROM Athletes`;
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
          CONCAT(Athletes.Fname, ' ', Athletes.Lname) AS 'name', 
          CONCAT(Races.Discipline, ' ', Races.Distance, 'km') AS Race,
          Time,
          CONCAT(RaceRank,
		        CASE
			        WHEN RaceRank %100 BETWEEN 11 AND 13 THEN 'th' 				-- this covers 11, 12, and 13 which dont follow the conventional suffix rule
			        WHEN RaceRank %10 = 1 THEN 'st' 												--
              WHEN RaceRank %10 = 2 THEN 'nd'											 	--
              WHEN RaceRank %10 = 3 THEN 'rd'												-- this line and the above 2 work for numbers starting from 1-9 and 14 and on. need to add a condition for 11,12, 13
              ELSE 'th'
		        END, 
            ' place') AS 'rank',
          ResultID
        FROM Results
        LEFT JOIN Athletes on Results.AthleteID = Athletes.AthleteID
        LEFT JOIN Races on Results.RaceID = Races.RaceID
        ORDER BY name; 
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
            CONCAT(Athletes.FName, ' ', Athletes.LName) AS name,
            CONCAT(Races.Discipline, ' ', Races.Distance, 'km') AS Race,
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
            ) AS rank,
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



/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});