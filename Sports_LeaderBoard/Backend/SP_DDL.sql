DROP PROCEDURE IF EXISTS sp_resetDB;

CREATE PROCEDURE sp_resetDB()
BEGIN 
    SET FOREIGN_KEY_CHECKS=0;
    SET AUTOCOMMIT = 0;

    DROP TABLE IF EXISTS Results;
    DROP TABLE IF EXISTS Races;
    DROP TABLE IF EXISTS Events;
    DROP TABLE IF EXISTS Athletes;

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
        Distance INT NOT NULL, 
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

END;

CALL sp_resetDB();