CREATE PROCEDURE Create_Class_From_TA
 @requirement VARCHAR(255),
 @addr_id BIGINT,
 @student_id BIGINT,
 @ts_id BIGINT,
 @tutor_id BIGINT,
 @Tutor_App_Id BIGINT
AS
BEGIN
	DECLARE @NewClassID INT;
    -- Insert du lieu vao bang class
	INSERT INTO [Ass2_CO2013].[dbo].[class] 
	(requirements,addr_id, student_id, ts_id, tutor_id)
	VALUES (@requirement, @addr_id, @student_id, @ts_id,@tutor_id);
    -- Lay id class
	SET @NewClassID = SCOPE_IDENTITY();
    -- Insert du lieu vao bang type của class - has_class_type
	INSERT INTO [Ass2_CO2013].[dbo].[has_class_type] (class_id, class_type_id)
    SELECT @NewClassID AS class_id, class_type_id
    FROM [Ass2_CO2013].[dbo].[s_wants_type]
    WHERE ta_id = @Tutor_App_Id;
    -- Insert du lieu vao bang subject của class - has_subject
    INSERT INTO [Ass2_CO2013].[dbo].[has_subject] ( class_id, subject_id)
    SELECT @NewClassID AS class_id, subject_id
    FROM [Ass2_CO2013].[dbo].[s_wants_subject]
    WHERE ta_id = @Tutor_App_Id;
END;

-- Khi admin xac nhan mo lop - set trạng thai 'Da mo lop'
CREATE PROCEDURE Update_Application_Status
    @Tutor_App_Status VARCHAR(255), 
    @Tutor_App_Id BIGINT
AS
BEGIN
    BEGIN TRY
        DECLARE @state VARCHAR(255);
        -- Lay gia tri status
        SELECT @state = ta_status
        FROM [Ass2_CO2013].[dbo].[tutor_application]
        WHERE ta_id = @Tutor_App_Id;
        -- Neu trạng thai co thay doi thanh 'Da mo lop'
        IF (@state !='Da mo lop' AND @Tutor_App_Status = 'Da mo lop') 
        BEGIN
                DECLARE
                @requirement VARCHAR(255),@addr_id BIGINT,@student_id BIGINT,@ts_id BIGINT,@tutor_id BIGINT;
                -- Lay thong tin tu don dang ki tutor_application
                SELECT 
                    @requirement = requirement, 
                    @addr_id = addr_id, 
                    @student_id = student_id, 
                    @ts_id = ts_id, 
                    @tutor_id = tutor_id
                FROM [Ass2_CO2013].[dbo].[tutor_application]
                WHERE ta_id = @Tutor_App_Id;
                -- Tao lop moi
                EXECUTE [Ass2_CO2013].[dbo].Create_Class_From_TA
                    @requirement, @addr_id, @student_id, @ts_id, @tutor_id, @Tutor_App_Id;
        END;
        IF (@state != @Tutor_App_Status ) 
        BEGIN
            UPDATE  [Ass2_CO2013].[dbo].[tutor_application]
            SET     ta_status = @Tutor_App_Status
            WHERE   ta_id = @Tutor_App_Id;
            PRINT 'Cập nhật trạng thái thành công!';
        END;
        ELSE PRINT 'Trạng thái chưa thay đổi!';    
    END TRY
    BEGIN CATCH 
        PRINT 'Lỗi khi cập nhật trạng thái: ' + ERROR_MESSAGE();
    END CATCH;
END;


-- -- Khong demo nay
-- CREATE TRIGGER Calculate_Tutor_Rate
-- ON [Ass2_CO2013].[dbo].[tutor_review]
-- AFTER INSERT, DELETE, UPDATE
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     -- Bảng tạm lưu danh sách tutor_id bị ảnh hưởng
--     DECLARE @AffectedTutors TABLE (tutor_id BIGINT);

--     -- Thêm tutor_id bị ảnh hưởng từ thao tác INSERT hoặc UPDATE
--     INSERT INTO @AffectedTutors (tutor_id)
--     SELECT DISTINCT c.tutor_id
--     FROM inserted i
--     JOIN [Ass2_CO2013].[dbo].[class] c ON i.class_id = c.class_id;

--     -- Thêm tutor_id bị ảnh hưởng từ thao tác DELETE
--     INSERT INTO @AffectedTutors (tutor_id)
--     SELECT DISTINCT c.tutor_id
--     FROM deleted d
--     JOIN [Ass2_CO2013].[dbo].[class] c ON d.class_id = c.class_id;

--     -- Loại bỏ các giá trị NULL
--     DELETE FROM @AffectedTutors WHERE tutor_id IS NULL;

--     -- Cập nhật lại điểm đánh giá cho từng tutor_id bị ảnh hưởng
--     UPDATE t
--     SET rate = (
--         SELECT AVG(r.rate)
--         FROM [Ass2_CO2013].[dbo].[tutor_review] r
--         JOIN [Ass2_CO2013].[dbo].[class] c ON r.class_id = c.class_id
--         WHERE c.tutor_id = t.tutor_id
--     )
--     FROM [Ass2_CO2013].[dbo].[tutor] t
--     WHERE t.tutor_id IN (SELECT tutor_id FROM @AffectedTutors);
-- END;