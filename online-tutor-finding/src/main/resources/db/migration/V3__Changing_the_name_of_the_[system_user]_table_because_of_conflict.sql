-- Changing the name of the dbo.[system_user] table to avoid
-- conflict
EXEC sp_rename 'dbo.[system_user]', 'oft_user';