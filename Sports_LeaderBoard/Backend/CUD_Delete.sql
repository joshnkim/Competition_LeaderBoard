DROP PROCEDURE IF EXISTS DeleteAthlete;

CREATE PROCEDURE DeleteAthlete(IN AthleteIDinput INT)
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction in case of any error 
        ROLLBACK;
        SELECT 'Error! Athlete cannot be deleted.' AS Result; 
    END;

    -- Start transaction
    START TRANSACTION;

    -- Delete from Athletes Table
    DELETE FROM Athletes WHERE AthleteID = AthleteIDinput; 

    -- Commit transaction 
    COMMIT;

    -- Return success message 
    SELECT 'Athlete deleted.' AS Result;
END;

CALL DeleteAthlete(1);