USE Ass2_CO2013;
GO

-- Create a new stored procedure called 'get_tutor_class_summary' in schema 'dbo'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'dbo'
    AND SPECIFIC_NAME = N'get_tutor_class_summary'
    AND ROUTINE_TYPE = N'PROCEDURE'
)
DROP PROCEDURE dbo.get_tutor_class_summary
GO


-- Create the stored procedure in the specified schema
CREATE PROCEDURE dbo.get_tutor_class_summary
    @min_class_num INT = NULL,
    @min_class_money BIGINT = NULL,
    @page_number INT = 1,
    @page_size INT = 10

AS
BEGIN
    BEGIN TRY
        -- Calculate the starting row for pagination
        DECLARE @offset INT = (@page_number - 1) * @page_size;

        -- SELECTION
        SELECT 
        -- basic infor of tutor
        id              AS [tutor_id],
        u.full_name     AS [tutor_name],
        u.phone_number  AS [phone_number],
        u.user_sex      AS [sex],
        s.date_of_birth AS [date_of_birth],
        t.bio           AS [biography],
        -- useful infor summary
        class_count     AS [number_of_class],
        money           AS [earned_money] 

        FROM 
        (
            SELECT 
            c.tutor_id                          AS [id], 
            COUNT (c.class_id)                  AS [class_count],
            SUM (c.salary - c.commission_fee)   AS [money]

            FROM 
            dbo.class c 
            WHERE 
            c.class_status = 'Da giao'
            GROUP BY c.tutor_id
            -- filter if NOT NULL
            HAVING 
            ( COALESCE(@min_class_num, 0) <= COUNT(c.class_id) ) 
            AND 
            ( COALESCE(@min_class_money, 0) <= SUM(c.salary - c.commission_fee))
        ) AS temp
        -- resolve tutor 
        JOIN 
        -- resolve tutor
        dbo.tutor t 
        ON temp.id = t.tutor_id
        -- resolve staff
        JOIN 
        dbo.staff s 
        ON t.tutor_id = s.staff_id
        -- resolve user
        JOIN 
        dbo.oft_user u 
        ON u.user_id = s.staff_id

        ORDER BY [number_of_class] DESC
        OFFSET @offset ROWS
        FETCH NEXT @page_size ROWS ONLY
        
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


-- SELECT *
-- FROM dbo.tutor t 
-- JOIN dbo.oft_user u 
-- ON t.tutor_id = u.user_id;
-- GO


-- SELECT *
-- FROM dbo.student t 
-- JOIN dbo.oft_user u
-- ON t.student_id = u.user_id;
-- GO 


-- SELECT *
-- FROM dbo.class_type;


-- SELECT *
-- FROM dbo.subject;


-- SELECT *
-- FROM dbo.time_slot;


-- SELECT *
-- FROM dbo.week_day;


-- SELECT *
-- FROM dbo.class;


-- -- example to execute the stored procedure we just created
-- -- DEFAULT VALUE
-- EXECUTE dbo.get_tutor_class_summary
-- -- @min_class_num = 5,
-- -- @min_class_money = 1000000,
-- -- @page_number = 1,
-- -- @page_size = 10
-- GO


-- -- example to execute the stored procedure we just created
-- -- PAGE 1, SIZE = 5
-- EXECUTE dbo.get_tutor_class_summary
-- -- @min_class_num = 5,
-- -- @min_class_money = 1000000,
-- @page_number = 1,
-- @page_size = 5
-- GO


-- -- example to execute the stored procedure we just created
-- -- PAGE 2, SIZE = 5
-- EXECUTE dbo.get_tutor_class_summary
-- -- @min_class_num = 5,
-- -- @min_class_money = 1000000,
-- @page_number = 1,
-- @page_size = 5
-- GO


-- -- example to execute the stored procedure we just created
-- -- TUTOR WHO TEACHES OVER 5 CLASSES
-- EXECUTE dbo.get_tutor_class_summary
-- @min_class_num = 3,
-- --@min_class_money = 1000000,
-- @page_number = 1,
-- @page_size = 5
-- GO


-- -- example to execute the stored procedure we just created
-- -- CHOOSE TUTOR WHO HAS THE MONEY OVER 2000000
-- EXECUTE dbo.get_tutor_class_summary
-- -- @min_class_num = 5,
-- @min_class_money = 2000000,
-- @page_number = 1,
-- @page_size = 5
-- GO


-- -- example to execute the stored procedure we just created
-- -- CHOOSE TUTOR WHO HAS TEACHES OVER 5 CLASSES AND HAS THE MONEY OVER 4000000
-- EXECUTE dbo.get_tutor_class_summary
-- @min_class_num = 5,
-- @min_class_money = 4000000,
-- @page_number = 1,
-- @page_size = 5
-- GO