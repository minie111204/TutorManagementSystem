package com.database241.onlinetutorfinding.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Configuration
@Transactional
public class InitDatabaseConfig {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void createProcedures() {
        try {
            // Kiểm tra và tạo thủ tục Create_Class_From_TA nếu chưa tồn tại
            String createProcedure1 = """
                        IF NOT EXISTS (
                            SELECT 1
                            FROM sys.objects
                            WHERE object_id = OBJECT_ID(N'[dbo].[Create_Class_From_TA]')
                                  AND type = N'P'
                        )
                        BEGIN
                            EXEC('
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
                                    INSERT INTO [Ass2_CO2013].[dbo].[class]
                                    (requirements, addr_id, student_id, ts_id, tutor_id)
                                    VALUES (@requirement, @addr_id, @student_id, @ts_id, @tutor_id);

                                    SET @NewClassID = SCOPE_IDENTITY();

                                    INSERT INTO [Ass2_CO2013].[dbo].[has_class_type] (class_id, class_type_id)
                                    SELECT @NewClassID AS class_id, class_type_id
                                    FROM [Ass2_CO2013].[dbo].[s_wants_type]
                                    WHERE ta_id = @Tutor_App_Id;
                                END;
                            ')
                        END;
                    """;

            // Kiểm tra và tạo thủ tục Update_Application_Status nếu chưa tồn tại
            String createProcedure2 = """
                        IF NOT EXISTS (
                            SELECT 1
                            FROM sys.objects
                            WHERE object_id = OBJECT_ID(N'[dbo].[Update_Application_Status]')
                                  AND type = N'P'
                        )
                        BEGIN
                            EXEC('
                                CREATE PROCEDURE Update_Application_Status
                                 @Tutor_App_Status VARCHAR(255),
                                 @Tutor_App_Id BIGINT
                                AS
                                BEGIN
                                    BEGIN TRY
                                        DECLARE @state VARCHAR(255);
                                        -- Lấy giá trị trạng thái
                                        SELECT @state = ta_status
                                        FROM [Ass2_CO2013].[dbo].[tutor_application]
                                        WHERE ta_id = @Tutor_App_Id;

                                        -- Nếu trạng thái thay đổi thành ''Đã mở lớp''
                                        IF (@state != ''Da mo lop'' AND @Tutor_App_Status = ''Da mo lop'')
                                        BEGIN
                                            DECLARE
                                                @requirement VARCHAR(255), @addr_id BIGINT,
                                                @student_id BIGINT, @ts_id BIGINT, @tutor_id BIGINT;

                                            -- Lấy thông tin từ bảng tutor_application
                                            SELECT
                                                @requirement = requirement,
                                                @addr_id = addr_id,
                                                @student_id = student_id,
                                                @ts_id = ts_id,
                                                @tutor_id = tutor_id
                                            FROM [Ass2_CO2013].[dbo].[tutor_application]
                                            WHERE ta_id = @Tutor_App_Id;

                                            -- Tạo lớp mới
                                            EXEC [Ass2_CO2013].[dbo].Create_Class_From_TA
                                                @requirement, @addr_id, @student_id, @ts_id, @tutor_id, @Tutor_App_Id;
                                        END;

                                        -- Cập nhật trạng thái nếu thay đổi
                                        IF (@state != @Tutor_App_Status)
                                        BEGIN
                                            UPDATE [Ass2_CO2013].[dbo].[tutor_application]
                                            SET ta_status = @Tutor_App_Status
                                            WHERE ta_id = @Tutor_App_Id;
                                            PRINT ''Cập nhật trạng thái thành công!'';
                                        END
                                        ELSE PRINT ''Trạng thái chưa thay đổi!'';
                                    END TRY
                                    BEGIN CATCH
                                        PRINT ''Lỗi khi cập nhật trạng thái: '' + ERROR_MESSAGE();
                                    END CATCH;
                                END;
                            ')
                        END;
                    """;
            jdbcTemplate.execute(createProcedure1);
            jdbcTemplate.execute(createProcedure2);
        } catch (Exception e) {
            throw new RuntimeException("Error creating stored procedures", e);
        }
    }

}
