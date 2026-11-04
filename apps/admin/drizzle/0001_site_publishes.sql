CREATE TABLE `site_publishes` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`posts` integer NOT NULL,
	`publications` integer NOT NULL,
	`status` text NOT NULL,
	`build_id` text,
	`message` text DEFAULT '' NOT NULL
);
