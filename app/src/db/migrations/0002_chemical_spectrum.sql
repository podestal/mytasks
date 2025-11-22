CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`sprint_id` integer NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'T' NOT NULL,
	`priority` text DEFAULT 'low' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`sprint_id`) REFERENCES `sprints`(`id`) ON UPDATE no action ON DELETE cascade
);
