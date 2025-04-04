-- Changing the name of the dbo.[user] table to avoid
-- conflict
EXEC sp_rename 'dbo.[user]', 'system_user';