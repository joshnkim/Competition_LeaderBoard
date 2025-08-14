DROP PROCEDURE IF EXISTS sp_resetDB;


CREATE PROCEDURE sp_resetDB()
BEGIN 
    SET FOREIGN_KEY_CHECKS=0;

    DROP TABLE IF EXISTS Results;
    DROP TABLE IF EXISTS Races;
    DROP TABLE IF EXISTS Events;
    DROP TABLE IF EXISTS Athletes;

    SET FOREIGN_KEY_CHECKS = 1; 

    CREATE TABLE Athletes (
        AthleteID INT AUTO_INCREMENT, 
        FName VARCHAR(55) NOT NULL, 
        LName VARCHAR(55) NOT NULL, 
        Age INT NOT NULL,
        Gender VARCHAR(10) NOT NULL,
        Country VARCHAR(55) NOT NULL,
        PRIMARY KEY (AthleteID)
    ); 

    CREATE TABLE Events (
        EventID INT AUTO_INCREMENT,
        Date DATETIME NOT NULL,
        Location VARCHAR(55) NOT NULL,
        Type VARCHAR(55) NOT NULL,
        PRIMARY KEY (EventID)
    );

    ALTER TABLE Events AUTO_INCREMENT=1000;

    CREATE TABLE Races (
        RaceID INT AUTO_INCREMENT,
        EventID INT NOT NULL,
        Discipline VARCHAR(55) NOT NULL, 
        Distance DECIMAL(4,2) NOT NULL, 
        PRIMARY KEY (RaceID),
        FOREIGN KEY (EventID) REFERENCES Events(EventID) ON DELETE CASCADE
    );

    ALTER TABLE Races AUTO_INCREMENT=5000;

    CREATE TABLE Results (
        ResultID INT AUTO_INCREMENT,
        RaceID INT NOT NULL,
        AthleteID INT NOT NULL,
        Time TIME NOT NULL,
        RaceRank INT NOT NULL,
        PRIMARY KEY (ResultID),
        FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE,
        FOREIGN KEY (AthleteID) REFERENCES Athletes(AthleteID) ON DELETE CASCADE
    );

    ALTER TABLE Results AUTO_INCREMENT=9000;

    INSERT INTO Athletes (FName, LName, Age, Gender, Country) VALUES
        ('Elijah', 'Brooks', 23, 'M', 'USA'),
        ('Zoe', 'Ramirez', 21, 'F', 'Mexico'),
        ('Nina', 'Yu', 26, 'F', 'China');

    INSERT INTO Events (Date, Location, Type) VALUES
        ('2025-07-21 08:00:00', 'Los Angeles', 'Sprint'),
        ('2025-08-14 09:00:00', 'Shanghai', 'Olympic'),
        ('2025-09-06 07:30:00', 'Mexico City', 'Ironman');

    INSERT INTO Races (EventID, Discipline, Distance) VALUES
        (1000, 'Swim', 1.5),
        (1001, 'Run', 5),
        (1002, 'Bike', 20);

    INSERT INTO Results (RaceID, AthleteID, Time, RaceRank) VALUES
        (5000, 1, '00:27:10', 4),
        (5001, 1, '00:24:50', 2),
        (5001, 2, '00:25:10', 3),
        (5000, 3, '00:26:30', 1),
        (5002, 3, '00:44:00', 5);

    COMMIT;

END;






-- CRUD FUNCTIONALITIES ------------------------------------------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------
-- ---------------------------------------------------------------------------------------------------------------


-- ---------------------------------------------------------------------------------------------------------------
-- CREATE AN ATHLETE 
DROP PROCEDURE IF EXISTS sp_createAthlete;

CREATE PROCEDURE sp_createAthlete(
    IN fnameInput VARCHAR(55),
    IN lnameInput VARCHAR(55),
    IN ageInput INT,
    IN genderInput VARCHAR(10),
    IN countryInput VARCHAR(55)
)

BEGIN 

    INSERT INTO Athletes ( FName, LName, Age, Gender, Country)								-- AthleteID is an auto-incremented value, so not included
    VALUES
    (fnameInput, lnameInput, ageInput, genderInput, countryInput);

END;


-- CREATE AN EVENT 
DROP PROCEDURE IF EXISTS sp_createEvent;

CREATE PROCEDURE sp_createEvent(
    IN dateInput DATETIME,
    IN locationInput VARCHAR(55),
    IN typeInput VARCHAR(55)
)

BEGIN 

    INSERT INTO Events (Date, Location, Type)                               
    VALUES
    (dateInput, locationInput, typeInput);

END;


-- CREATE A RACE 
DROP PROCEDURE IF EXISTS sp_createRace; 

CREATE PROCEDURE sp_createRace(
    IN eventIDInput INT,
    IN disciplineInput VARCHAR(55),
    IN distanceInput DECIMAL(4,2)
)

BEGIN 

    INSERT INTO Races (EventID, Discipline, Distance)
    VALUES 
    (eventIDInput, disciplineInput, distanceInput);

END;


-- CREATE A RESULT
DROP PROCEDURE IF EXISTS sp_createResult;

CREATE PROCEDURE sp_createResult(
    IN raceIDInput INT,
    IN athleteIDInput INT, 
    IN timeInput TIME,
    IN raceRankInput INT
)

BEGIN 

    INSERT INTO Results (RaceID, AthleteID, Time, RaceRank)
    VALUES
    (raceIDInput, athleteIDInput, timeInput, raceRankInput);

END; 
-- ---------------------------------------------------------------------------------------------------------------












-- ---------------------------------------------------------------------------------------------------------------
-- UPDATE AN ATHLETE
DROP PROCEDURE IF EXISTS sp_updateAthlete;

CREATE PROCEDURE sp_updateAthlete(
    IN athleteIDInput INT,
    IN fnameInput VARCHAR(55),
    IN lnameInput VARCHAR(55),
    IN ageInput INT,
    IN genderInput VARCHAR(10),
    IN countryInput VARCHAR(55)
)

BEGIN 

    UPDATE Athletes 
    SET 
        FName = fnameInput, 
        LName = lnameInput, 
        Age = ageInput,
        Gender = genderInput, 
        Country = countryInput
    WHERE AthleteID = athleteIDinput;

END;










-- ---------------------------------------------------------------------------------------------------------------
-- DELETE AN EVENT
DROP PROCEDURE IF EXISTS sp_deleteEvent;

CREATE PROCEDURE sp_deleteEvent(
    IN eventIDInput INT
)

BEGIN 

    DELETE FROM Events WHERE EventID = eventIDInput;

END;


-- DELETE A RACE
DROP PROCEDURE IF EXISTS sp_deleteRace;

CREATE PROCEDURE sp_deleteRace(
    IN raceIDInput INT
)

BEGIN 

    DELETE FROM Races WHERE RaceID = raceIDInput;

END;


-- DELETE AN ATHLETE 
DROP PROCEDURE IF EXISTS sp_deleteAthlete;

CREATE PROCEDURE sp_deleteAthlete(
    IN athleteIDInput INT
)

BEGIN 

    DELETE FROM Athletes WHERE AthleteID = athleteIDInput;

END; 


-- DELETE A RESULT
DROP PROCEDURE IF EXISTS sp_deleteResults;

CREATE PROCEDURE sp_deleteResults(
    IN resultIDInput INT
)

BEGIN 

    DELETE FROM Results WHERE ResultID = resultIDInput;

END; 
-- ---------------------------------------------------------------------------------------------------------------