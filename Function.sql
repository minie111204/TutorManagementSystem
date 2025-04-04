CREATE FUNCTION Calculate_Revenue_All()
RETURNS @ResultProfit TABLE (
    Current_Revenue     DECIMAL(18, 2) NULL,
    Expected_Revenue    DECIMAL(18, 2) NULL,
    Discount_Revenue    DECIMAL(18, 2) NULL  
)
AS
BEGIN
    -- Khai báo biến lưu giá trị tổng
    DECLARE @Current_Revenue DECIMAL(18, 2) = 0,
            @Expected_Revenue DECIMAL(18, 2) = 0,
            @Discount_Revenue DECIMAL(18, 2) = 0;

    -- Bảng tạm chứa dữ liệu kết hợp
    DECLARE @TempTable TABLE (
        ClassID INT,
        Commission_Fee DECIMAL(18, 2),
        BillMoney DECIMAL(18, 2),
        BillStatus NVARCHAR(50),
        BillType NVARCHAR(50)
    );
    -- Chèn dữ liệu vào bảng tạm
    INSERT INTO @TempTable (ClassID, Commission_Fee, BillMoney, BillStatus, BillType)
    SELECT 
        C.class_id,
        C.commission_fee,
        B.bill_money,
        B.bill_status,
        B.bill_type
    FROM [Ass2_CO2013].[dbo].class C
    LEFT JOIN [Ass2_CO2013].[dbo].belongs_to BE ON C.class_id = BE.class_id
    LEFT JOIN [Ass2_CO2013].[dbo].bill B ON BE.bill_id = B.bill_id;

    -- Khai báo con trỏ (Cursor) để duyệt qua bảng tạm
    DECLARE temp_cursor CURSOR FOR
    SELECT ClassID, Commission_Fee, BillMoney, BillStatus, BillType
    FROM @TempTable;

    -- Biến để lưu dữ liệu trong mỗi lần duyệt
    DECLARE @ClassID INT,
            @Commission_Fee DECIMAL(18, 2),
            @BillMoney DECIMAL(18, 2),
            @BillStatus NVARCHAR(50),
            @BillType NVARCHAR(50);

    -- Mở con trỏ
    OPEN temp_cursor;

    -- Đọc từng dòng
    FETCH NEXT FROM temp_cursor INTO @ClassID, @Commission_Fee, @BillMoney, @BillStatus, @BillType;

    WHILE @@FETCH_STATUS = 0
    BEGIN
    
        -- Cộng dồn doanh thu kỳ vọng
        IF (@Commission_Fee >0) SET @Expected_Revenue =@Expected_Revenue + @Commission_Fee;

        -- Cộng dồn doanh thu thực tế và giảm giá
        IF @BillStatus = 'Xac nhan' AND @BillType = 'Phi hoa hong'
        BEGIN
            SET @Current_Revenue += @BillMoney;

            IF @BillMoney < @Commission_Fee
                SET @Discount_Revenue += (@Commission_Fee - @BillMoney);
        END;

        -- Đọc dòng tiếp theo
        FETCH NEXT FROM temp_cursor INTO @ClassID, @Commission_Fee, @BillMoney, @BillStatus, @BillType;
    END;

    -- Đóng và giải phóng con trỏ
    CLOSE temp_cursor;
    DEALLOCATE temp_cursor;

    -- Chèn kết quả vào bảng trả về
    INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue)
    VALUES (@Current_Revenue, @Expected_Revenue, @Discount_Revenue);

    RETURN;
END;



-- SELECT * FROM [Ass2_CO2013].[dbo].Calculate_Revenue_Subject('Ngu van');
CREATE FUNCTION Calculate_Revenue_Subject(@SubjectID BIGINT)
RETURNS @ResultProfit TABLE (
    Current_Revenue     DECIMAL(18, 2) NULL,
    Expected_Revenue    DECIMAL(18, 2) NULL,
    Discount_Revenue    DECIMAL(18, 2) NULL,
    Error_Message       NVARCHAR(255) NULL -- Cột thông báo lỗi
)
AS
BEGIN
    -- Khai báo biến lưu giá trị tổng
    DECLARE @Current_Revenue DECIMAL(18, 2) = 0,
            @Expected_Revenue DECIMAL(18, 2) = 0,
            @Discount_Revenue DECIMAL(18, 2) = 0;

    -- Bảng tạm chứa dữ liệu kết hợp
    DECLARE @TempTable TABLE (
        ClassID INT,
        Commission_Fee DECIMAL(18, 2),
        BillMoney DECIMAL(18, 2),
        BillStatus NVARCHAR(50),
        BillType NVARCHAR(50)
    );

    -- Chèn dữ liệu vào bảng tạm
    INSERT INTO @TempTable (ClassID, Commission_Fee, BillMoney, BillStatus, BillType)
    SELECT 
        C.class_id,
        C.commission_fee,
        B.bill_money,
        B.bill_status,
        B.bill_type
    FROM [Ass2_CO2013].[dbo].class C
    LEFT JOIN [Ass2_CO2013].[dbo].has_subject H ON C.class_id = H.class_id 
    LEFT JOIN [Ass2_CO2013].[dbo].belongs_to BE ON C.class_id = BE.class_id
    LEFT JOIN [Ass2_CO2013].[dbo].bill B ON BE.bill_id = B.bill_id 
    WHERE H.subject_id = @SubjectID;

    -- Kiểm tra nếu không có dữ liệu (môn học không tồn tại)
    IF NOT EXISTS (SELECT 1 FROM @TempTable)
    BEGIN
        -- Trả về thông báo lỗi trong kết quả
        INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue, Error_Message)
        VALUES (NULL, NULL, NULL, 'Subject does not exist');
        RETURN;
    END

    -- Khai báo con trỏ (Cursor) để duyệt qua bảng tạm
    DECLARE temp_cursor CURSOR FOR
    SELECT ClassID, Commission_Fee, BillMoney, BillStatus, BillType
    FROM @TempTable;

    -- Biến để lưu dữ liệu trong mỗi lần duyệt
    DECLARE @ClassID INT,
            @Commission_Fee DECIMAL(18, 2),
            @BillMoney DECIMAL(18, 2),
            @BillStatus NVARCHAR(50),
            @BillType NVARCHAR(50);

    -- Mở con trỏ
    OPEN temp_cursor;

    -- Đọc từng dòng
    FETCH NEXT FROM temp_cursor INTO @ClassID, @Commission_Fee, @BillMoney, @BillStatus, @BillType;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Cộng dồn doanh thu kỳ vọng
        IF (@Commission_Fee > 0) SET @Expected_Revenue = @Expected_Revenue + @Commission_Fee;

        -- Cộng dồn doanh thu thực tế và giảm giá
        IF @BillStatus = 'Xac nhan' AND @BillType = 'Phi hoa hong'
        BEGIN
            SET @Current_Revenue += @BillMoney;

            IF @BillMoney < @Commission_Fee
                SET @Discount_Revenue += (@Commission_Fee - @BillMoney);
        END;

        -- Đọc dòng tiếp theo
        FETCH NEXT FROM temp_cursor INTO @ClassID, @Commission_Fee, @BillMoney, @BillStatus, @BillType;
    END;

    -- Đóng và giải phóng con trỏ
    CLOSE temp_cursor;
    DEALLOCATE temp_cursor;

    -- Trả về kết quả
    INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue)
    VALUES (@Current_Revenue, @Expected_Revenue, @Discount_Revenue);

    RETURN;
END;



--SELECT * FROM dbo.Calculate_Revenue_Subject(9999);  -- Môn học với ID không tồn tại


--drop FUNCTION Calculate_Revenue
--SELECT * FROM [Ass2_CO2013].[dbo].Calculate_Revenue('Subject', 'Toan');
CREATE FUNCTION Calculate_Revenue(@Types VARCHAR(255), @InputValues VARCHAR(255))
RETURNS @ResultProfit TABLE (
    Current_Revenue     DECIMAL(18, 2) DEFAULT 0,
    Expected_Revenue    DECIMAL(18, 2) DEFAULT 0,
    Discount_Revenue    DECIMAL(18, 2) DEFAULT 0,
    Error_Message       NVARCHAR(255) NULL -- Cột thông báo lỗi
)
AS
BEGIN
    -- Kiểm tra giá trị đầu vào
    IF (@Types IS NULL OR @Types = '') 
    BEGIN
        INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue, Error_Message)
        VALUES (NULL, NULL, NULL, 'Invalid type');
        RETURN;
    END;

    IF (@InputValues IS NULL OR @InputValues = '') AND @Types != 'ALL'
    BEGIN
        INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue, Error_Message)
        VALUES (NULL, NULL, NULL, 'Invalid input values');
        RETURN;
    END;

    -- Logic tính toán theo loại lọc
    IF (@Types = 'ALL')
    BEGIN
        INSERT INTO @ResultProfit 
        SELECT Current_Revenue, Expected_Revenue, Discount_Revenue, NULL
        FROM [Ass2_CO2013].[dbo].Calculate_Revenue_All();
        RETURN;
    END;

    IF (@Types = 'Subject')
    BEGIN
        DECLARE @SubjectID BIGINT;

        -- Tìm ID môn học từ tên môn học
        SELECT @SubjectID = subject_id
        FROM [Ass2_CO2013].[dbo].subject 
        WHERE @InputValues = subject_name;

        -- Kiểm tra nếu môn học không tồn tại
        IF @SubjectID IS NULL 
        BEGIN
            -- Nếu môn học không tồn tại, trả về thông báo lỗi và NULL cho các cột doanh thu
            INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue, Error_Message)
            VALUES (NULL, NULL, NULL, 'Subject does not exist');
            RETURN;
        END;

        -- Nếu môn học tồn tại, tính toán doanh thu cho môn học đó
        INSERT INTO @ResultProfit 
        SELECT Current_Revenue, Expected_Revenue, Discount_Revenue, NULL
        FROM [Ass2_CO2013].[dbo].Calculate_Revenue_Subject(@SubjectID);
        RETURN;
    END;

    -- Trường hợp không xác định
    INSERT INTO @ResultProfit (Current_Revenue, Expected_Revenue, Discount_Revenue, Error_Message)
    VALUES (NULL, NULL, NULL, 'Invalid parameters');
    RETURN;
END;

-- Test Case: Tính toán doanh thu cho môn học "Toán"
--SELECT * FROM dbo.Calculate_Revenue('Subject', 'Toan');