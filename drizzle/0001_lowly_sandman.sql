DROP INDEX IF EXISTS `Account_userId_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `session_sessionToken_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `Session_userId_index`;--> statement-breakpoint
DROP INDEX IF EXISTS `user_email_unique`;--> statement-breakpoint
ALTER TABLE `session` DROP COLUMN `id`;