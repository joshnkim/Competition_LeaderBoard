DROP PROCEDURE IF EXISTS DeleteAthlete1;

CREATE PROCEDURE DeleteAthlete1()
BEGIN 
    DELETE FROM Athletes WHERE AthleteID = 1; 
END;

CALL DeleteAthlete1();