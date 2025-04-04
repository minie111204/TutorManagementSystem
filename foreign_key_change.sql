USE Ass2_CO2013;
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- has_subject
-- Step 1: Drop the existing foreign key constraint
ALTER TABLE [dbo].[has_subject] 
DROP CONSTRAINT [FKmw0ctgljfd2dgvksjkxandyxi];
GO

-- Step 2: Recreate the foreign key with ON DELETE CASCADE
ALTER TABLE [dbo].[has_subject] 
ADD CONSTRAINT [FK_class_has_subjects] 
FOREIGN KEY ([class_id]) 
REFERENCES [dbo].[class] ([class_id]) 
ON DELETE CASCADE;
GO

-- Step 3: Add the PRIMARY KEY
ALTER TABLE [dbo].[has_subject] ADD PRIMARY KEY CLUSTERED 
(
	[class_id] ASC,
	[subject_id] ASC
) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY];
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- has_class_type
-- Step 1: Drop the existing foreign key constraint on class_id
ALTER TABLE [dbo].[has_class_type] 
DROP CONSTRAINT [FKc7f1lnyrqsrsfuhgvnugm6dln];
GO

-- Step 2: Recreate the foreign key with ON DELETE CASCADE
ALTER TABLE [dbo].[has_class_type] 
ADD CONSTRAINT [FK_class_has_class_types] 
FOREIGN KEY ([class_id]) 
REFERENCES [dbo].[class] ([class_id]) 
ON DELETE CASCADE;
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- is_held_on
-- Step 1: Drop the existing foreign key for class_id
ALTER TABLE [dbo].[is_held_on] 
DROP CONSTRAINT [FK108uwrguervpcb7u4efkeeuq8];
GO

-- Step 2: Recreate the foreign key with ON DELETE CASCADE for class_id
ALTER TABLE [dbo].[is_held_on] 
ADD CONSTRAINT [FK_class_has_days_and_times] 
FOREIGN KEY ([class_id]) 
REFERENCES [dbo].[class] ([class_id]) 
ON DELETE CASCADE;
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- tutor_review
-- Step 1: Drop existing foreign key for class_id
ALTER TABLE [dbo].[tutor_review] 
DROP CONSTRAINT [FKbxewdmj7a0ey7rn3nmh4bi0uo];
GO

-- Step 2: Recreate foreign key for class_id with ON DELETE CASCADE
ALTER TABLE [dbo].[tutor_review] 
ADD CONSTRAINT [FK_class_has_reviews] 
FOREIGN KEY ([class_id]) 
REFERENCES [dbo].[class] ([class_id]) 
ON DELETE CASCADE;
GO

-- Step 3: Drop existing foreign key for student_id
ALTER TABLE [dbo].[tutor_review] 
DROP CONSTRAINT [FKn1grl881osn7u0qtqi9epb4t3];
GO

-- Step 4: Recreate foreign key for student_id with ON DELETE CASCADE
ALTER TABLE [dbo].[tutor_review] 
ADD CONSTRAINT [FK_student_has_reviews] 
FOREIGN KEY ([student_id]) 
REFERENCES [dbo].[student] ([student_id]) 
ON DELETE CASCADE;
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- belongs_to
-- when delete a class -> all the bills belong to
-- that class would be deleted
-- tutor won't see those bills
-- but admin can
ALTER TABLE [dbo].[belongs_to] 
DROP CONSTRAINT [FKcm6ah4ct4ne63irtlm1j2udwk];
GO

ALTER TABLE [dbo].[belongs_to] 
ADD CONSTRAINT [FK_class_tutor_has_bills] 
FOREIGN KEY ([class_id]) 
REFERENCES [dbo].[class] ([class_id]) 
ON DELETE CASCADE;
GO
--------------------------------------------------------------------------
--------------------------------------------------------------------------
-- teaching_application
-- For class foreign key (ON DELETE CASCADE)
ALTER TABLE [dbo].[teaching_application] 
DROP CONSTRAINT [FKmmlf4kk51ea4ax7yyc7py5pie];
GO

ALTER TABLE [dbo].[teaching_application] 
ADD CONSTRAINT [FK_class_has_teaching_applications] 
FOREIGN KEY([class_id]) 
REFERENCES [dbo].[class]([class_id]) 
ON DELETE CASCADE;
GO

-- For tutor foreign key (ON DELETE CASCADE)
ALTER TABLE [dbo].[teaching_application] 
DROP CONSTRAINT [FKk6umk3f8cc5pmgicpwkw9a2os];
GO

ALTER TABLE [dbo].[teaching_application] 
ADD CONSTRAINT [FK_tutor_has_teaching_applications] 
FOREIGN KEY([tutor_id]) 
REFERENCES [dbo].[tutor]([tutor_id]) 
ON DELETE CASCADE;
GO