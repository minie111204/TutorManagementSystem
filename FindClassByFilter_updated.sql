CREATE OR ALTER PROCEDURE FindClassByFilter_updated

    @class_type_name VARCHAR(255) = NULL,
    @ts_name VARCHAR(255) = NULL,
    @name VARCHAR(255) = NULL,
    @class_status VARCHAR(255) = NULL,
    @subject_name VARCHAR(255) = NULL,
    @phone_number VARCHAR(255) = NULL,
    @date_start_from DATETIME2(7) = NULL,
    @date_start_to DATETIME2(7) = NULL,
    @sort_order NVARCHAR(4) = 'ASC'
AS
BEGIN
    -- Check if any matching data exists
    IF NOT EXISTS (
        SELECT 1
        FROM 
            class c 
            INNER JOIN address a ON c.addr_id = a.addr_id
            INNER JOIN district_city d ON a.dist_city_id = d.dist_city_id
            INNER JOIN teaching_style ts ON c.ts_id = ts.ts_id
            INNER JOIN student st ON c.student_id = st.student_id
            INNER JOIN oft_user u ON st.student_id = u.user_id
        WHERE
            (@class_type_name IS NULL OR EXISTS (
                SELECT 1 
                FROM has_class_type hct 
                INNER JOIN class_type ct ON hct.class_type_id = ct.class_type_id
                WHERE hct.class_id = c.class_id AND ct.class_type_name = @class_type_name
            )) AND
            (@ts_name IS NULL OR ts.ts_name = @ts_name) AND
            (@name IS NULL OR d.name = @name) AND
            (@class_status IS NULL OR c.class_status = @class_status) AND
            (@subject_name IS NULL OR EXISTS (
                SELECT 1 
                FROM has_subject hs 
                INNER JOIN subject s ON hs.subject_id = s.subject_id
                WHERE hs.class_id = c.class_id AND s.subject_name = @subject_name
            )) AND
            (@phone_number IS NULL OR u.phone_number = @phone_number) AND
            (@date_start_from IS NULL OR c.date_start >= @date_start_from) AND
            (@date_start_to IS NULL OR c.date_start <= @date_start_to)
    )
    BEGIN
        -- No matching data
        RAISERROR('No data found for the given filters.', 16, 1);
        RETURN;
    END;

    -- Query to retrieve the required data
    DECLARE @sql_query NVARCHAR(MAX);
    SET @sql_query = N'
    SELECT
        c.class_id,
        c.date_start,
        c.class_status,
        d.name AS district_name,
        ts.ts_name AS teaching_style,
        
        -- Use STRING_AGG to avoid duplication issues from has_subject and has_class_type
        (
            SELECT STRING_AGG(s.subject_name, '', '') 
            FROM has_subject hs 
            INNER JOIN subject s ON hs.subject_id = s.subject_id 
            WHERE hs.class_id = c.class_id
        ) AS subject_names,

        (
            SELECT STRING_AGG(ct.class_type_name, '', '') 
            FROM has_class_type hct 
            INNER JOIN class_type ct ON hct.class_type_id = ct.class_type_id 
            WHERE hct.class_id = c.class_id
        ) AS class_type_names,

        u.phone_number
    FROM 
        class c
        INNER JOIN address a ON c.addr_id = a.addr_id
        INNER JOIN district_city d ON a.dist_city_id = d.dist_city_id
        INNER JOIN teaching_style ts ON c.ts_id = ts.ts_id
        INNER JOIN student st ON c.student_id = st.student_id
        INNER JOIN oft_user u ON st.student_id = u.user_id
    WHERE
        (@class_type_name IS NULL OR EXISTS (
            SELECT 1 
            FROM has_class_type hct 
            INNER JOIN class_type ct ON hct.class_type_id = ct.class_type_id
            WHERE hct.class_id = c.class_id AND ct.class_type_name = @class_type_name
        )) AND
        (@ts_name IS NULL OR ts.ts_name = @ts_name) AND
        (@name IS NULL OR d.name = @name) AND
        (@class_status IS NULL OR c.class_status = @class_status) AND
        (@subject_name IS NULL OR EXISTS (
            SELECT 1 
            FROM has_subject hs 
            INNER JOIN subject s ON hs.subject_id = s.subject_id
            WHERE hs.class_id = c.class_id AND s.subject_name = @subject_name
        )) AND
        (@phone_number IS NULL OR u.phone_number = @phone_number) AND
        (@date_start_from IS NULL OR c.date_start >= @date_start_from) AND
        (@date_start_to IS NULL OR c.date_start <= @date_start_to)
    ORDER BY 
        c.class_id ' + @sort_order + ';';

    -- Execute dynamic SQL
    EXEC sp_executesql @sql_query,
        N'@class_type_name VARCHAR(255), @ts_name VARCHAR(255), @name VARCHAR(255), @class_status VARCHAR(255), @subject_name VARCHAR(255), @phone_number VARCHAR(255), @date_start_from DATETIME2(7), @date_start_to DATETIME2(7)', 
        @class_type_name, @ts_name, @name, @class_status, @subject_name, @phone_number, @date_start_from, @date_start_to;
END;
GO


SELECT *
FROM dbo.class;


EXECUTE dbo.FindClassByFilter_updated @date_start_from = '2024-12-01', @date_start_to = '2024-12-20';