-- FOR INSERT, UPDATE, DELETE
USE Ass2_CO2013;
GO


-- Create a new stored procedure called 'insert_class' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'insert_class'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.insert_class
GO


CREATE PROCEDURE dbo.insert_class
    @class_deposit      BIGINT,
    @class_status       VARCHAR(255) = 'Chua giao',
    @commission_fee     BIGINT,
    @requirements       VARCHAR(255),
    @date_start         DATETIME2(7),
    @salary             BIGINT,
    @addr_id            BIGINT,
    @student_id         BIGINT,
    @ts_id              BIGINT,
    @tutor_id           BIGINT = NULL,
    @inserted_class_id  BIGINT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- Validation for addr_id
        IF @addr_id IS NULL
            THROW 50001, 'An address is needed', 1;

        -- Validation for student_id
        IF @student_id IS NULL 
            THROW 50007, 'Class must have a student', 1;

        -- Validation for simple business logic
        IF @class_deposit > @salary
            THROW 50002, 'The deposit must be less than the salary', 1;

        -- Validation for class_style
        IF @ts_id IS NULL 
            THROW 50008, 'Class must have a class style', 1;

        -- Validation that the address of the class
        -- must belong to the student in the class
        -- [a student can have multiple address]
        IF 
        (
            @addr_id NOT IN 
            (
                -- All addresses of student
                SELECT a.addr_id
                FROM dbo.address a 
                WHERE a.user_id = @student_id
            )
        )
            THROW 50009, 'Student does not have the address', 1;


        INSERT INTO dbo.class
        (
            class_deposit, class_status, commission_fee, 
            requirements, date_start, salary, 
            addr_id, student_id, ts_id, tutor_id
        )
        -- return the class_id
        -- OUTPUT inserted.class_id INTO @inserted_class_id
        VALUES
        (
            @class_deposit, @class_status, @commission_fee, 
            @requirements, @date_start, @salary, 
            @addr_id, @student_id, @ts_id, @tutor_id
        );

        SET @inserted_class_id = SCOPE_IDENTITY();

    END TRY 

    BEGIN CATCH

        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application
        THROW;

    END CATCH 
END
GO


USE Ass2_CO2013;
GO 


-- Create a new stored procedure called 'update_class' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'update_class'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.update_class
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE update_class
    @class_id       BIGINT,
    @class_deposit  BIGINT = NULL,           -- Default NULL allows optional update
    @class_status   VARCHAR(255) = NULL,
    @commission_fee BIGINT = NULL,
    @requirements   VARCHAR(255) = NULL,
    @date_start     DATETIME2(7) = NULL,
    @salary         BIGINT = NULL,
    @addr_id        BIGINT = NULL,           -- This is NOT NULL, so optional update logic is important
    @student_id     BIGINT = NULL,           -- This is NOT NULL, so optional update logic is important
    @ts_id          BIGINT = NULL,           -- This is NOT NULL, so optional update logic is important
    @tutor_id       BIGINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
        -- Update the class
        -- ISNULL() is used for optional update
        UPDATE dbo.class
        SET 
            -- class_id is not allowed to update
            class_deposit =     ISNULL(@class_deposit, class_deposit),
            class_status =      ISNULL(@class_status, class_status),
            commission_fee =    ISNULL(@commission_fee, commission_fee),
            requirements =      ISNULL(@requirements, requirements),
            date_start =        ISNULL(@date_start, date_start),
            salary =            ISNULL(@salary, salary),
            addr_id =           ISNULL(@addr_id, addr_id),       
            student_id =        ISNULL(@student_id, student_id), 
            ts_id =             ISNULL(@ts_id, ts_id),             
            tutor_id =          ISNULL(@tutor_id, tutor_id)
        WHERE class_id = @class_id;

        -- If no rows were affected, class_id might not exist
        IF @@ROWCOUNT = 0
        BEGIN 
            ROLLBACK TRANSACTION;
            RETURN;
        END 

        -- Commit the transaction
        COMMIT TRANSACTION;

    END TRY

    BEGIN CATCH

        -- Roll back the transaction if any error occurs
        IF @@TRANCOUNT > 0 
            ROLLBACK TRANSACTION;

        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application
        THROW;
    END CATCH
END;
GO


USE Ass2_CO2013;
GO
-- Create a new stored procedure called 'delete_class' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'delete_class'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.delete_class
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[delete_class]
    @class_id BIGINT
AS
BEGIN
    BEGIN TRY

        -- Start transaction to ensure atomicity
        BEGIN TRANSACTION;

        -- Check if the class exists
        IF NOT EXISTS 
        (
            SELECT 1 
            FROM [dbo].[class] 
            WHERE [class_id] = @class_id
        )
            -- If the class does not exist, return an error
            THROW 50003, 'Class has been altered or deleted', 1;

        -- Delete the class from the table
        DELETE FROM [dbo].[class] 
        WHERE [class_id] = @class_id;

        -- Commit the transaction
        COMMIT TRANSACTION;

        -- PRINT 'Class with ID ' + CAST(@class_id AS VARCHAR) + ' has been successfully deleted.';

    END TRY

    BEGIN CATCH

        -- Rollback the transaction if an error occurs
        IF @@TRANCOUNT > 0 
            ROLLBACK TRANSACTION;

        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application
        THROW;

    END CATCH
END;
GO


------------------------AUXILIARY
USE Ass2_CO2013;
GO


CREATE TYPE SUBJECT_ID_LIST AS TABLE 
(
    subject_id BIGINT NOT NULL
);


-- Create a new stored procedure called 'insert_has_subject' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS 
(
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'insert_has_subject'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.insert_has_subject
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.insert_has_subject
    @class_id BIGINT,
    @subject_id_list SUBJECT_ID_LIST READONLY
AS
BEGIN

    SET NOCOUNT ON;

    BEGIN TRY 

        -- can be updated for the update use-case
        -- checking for class_id
        IF NOT EXISTS 
            (
                SELECT 1
                FROM dbo.class c  
                WHERE c.class_id = @class_id
            )
            THROW 50003, 'Class has been altered or deleted', 1;

        -- checking for the subject_id
        IF EXISTS 
            (
                SELECT 1
                FROM @subject_id_list l
                WHERE l.subject_id NOT IN 
                (
                    SELECT s.subject_id
                    FROM dbo.subject s
                )
            )
            THROW 50004, 'One or more subjects do not exist', 1;

        -- deleting any links
        -- for updating
        DELETE FROM dbo.has_subject 
        WHERE class_id = @class_id; 

        INSERT INTO dbo.has_subject(class_id, subject_id)
        SELECT @class_id, l.subject_id
        FROM @subject_id_list l;

    END TRY

    BEGIN CATCH
        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application to show error
        THROW;
    END CATCH
END
GO


USE Ass2_CO2013;
GO


CREATE TYPE TIME_LIST AS TABLE
(
    week_id BIGINT NOT NULL,
    slot_id BIGINT NOT NULL
);
GO


-- Create a new stored procedure called 'insert_is_held_on' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'insert_is_held_on'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.insert_is_held_on
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.insert_is_held_on
    @class_id BIGINT,
    @time_list TIME_LIST READONLY
-- add more stored procedure parameters here
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- can be updated for the update use-case
        -- checking for class_id
        IF NOT EXISTS 
            (
                SELECT 1
                FROM dbo.class c  
                WHERE c.class_id = @class_id
            )
            THROW 50003, 'Class has been altered or deleted', 1;

        -- checking for slot_id
        IF EXISTS 
            (
                SELECT 1
                FROM @time_list l 
                WHERE l.week_id NOT IN 
                (
                    SELECT w.week_id
                    FROM dbo.week_day w
                )
            )
            OR 
            EXISTS 
            (
                SELECT 1
                FROM @time_list l 
                WHERE l.slot_id NOT IN 
                (
                    SELECT t.slot_id
                    FROM dbo.time_slot t
                )
            )
            THROW 50006, 'Weekdays or times are not allowed to choose', 1;


        -- delete from update
        DELETE FROM dbo.is_held_on
        WHERE class_id = @class_id;

        INSERT INTO dbo.is_held_on
        SELECT @class_id, t.week_id, t.slot_id
        FROM @time_list t;

    END TRY 

    BEGIN CATCH 
        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application to show error
        THROW;
    END CATCH
END
GO


USE Ass2_CO2013;
GO


-- TYPE for the input
CREATE TYPE CLASS_TYPE_ID_LIST AS TABLE
(
    class_type_id BIGINT NOT NULL
);
GO



-- Create a new stored procedure called 'insert_has_class_type' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'insert_has_class_type'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.insert_has_class_type
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.insert_has_class_type
    @class_id BIGINT,
    @class_type_id_list CLASS_TYPE_ID_LIST READONLY
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY 
        -- can be updated for the update use-case
        -- checking for class_id
        IF NOT EXISTS 
            (
                SELECT 1
                FROM dbo.class c  
                WHERE c.class_id = @class_id
            )
        THROW 50003, 'Class has been altered or deleted', 1;

        -- checking for class_id_type
        IF EXISTS 
            (
                SELECT 1
                FROM @class_type_id_list l 
                WHERE l.class_type_id NOT IN 
                (
                    SELECT ct.class_type_id
                    FROM dbo.class_type ct
                )
            )
        THROW 50005, 'One or more class types do not exist', 1;

        -- delete from update
        DELETE FROM dbo.has_class_type
        WHERE class_id = @class_id;

        INSERT INTO dbo.has_class_type(class_id, class_type_id)
        SELECT @class_id, l.class_type_id
        FROM @class_type_id_list l;
    END TRY 

    BEGIN CATCH 
        -- For debugging as SA
        SELECT ERROR_LINE() AS [error line],
        ERROR_MESSAGE() AS [message],
        ERROR_NUMBER() AS [number],
        ERROR_PROCEDURE() AS [procedure],
        ERROR_SEVERITY() AS [severity],
        ERROR_STATE() AS [state];

        -- For application to show error
        THROW;
    END CATCH

END
GO
