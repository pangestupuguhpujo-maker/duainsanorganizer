CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sessions_user_id` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_sessions_expires_at` ON `sessions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'ADMIN' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `idx_users_email` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`short_description` text NOT NULL,
	`description` text NOT NULL,
	`icon` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_services_slug` ON `services` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_services_order` ON `services` (`display_order`);--> statement-breakpoint
CREATE TABLE `package_features` (
	`id` text PRIMARY KEY NOT NULL,
	`package_id` text NOT NULL,
	`feature_text` text NOT NULL,
	`is_included` integer DEFAULT true NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_pkg_features_pkg_id` ON `package_features` (`package_id`);--> statement-breakpoint
CREATE TABLE `packages` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`short_description` text NOT NULL,
	`description` text NOT NULL,
	`starting_price` integer NOT NULL,
	`price_note` text,
	`cover_image` text NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `packages_slug_unique` ON `packages` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_packages_slug` ON `packages` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_packages_active_featured` ON `packages` (`is_active`,`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_packages_order` ON `packages` (`display_order`);--> statement-breakpoint
CREATE TABLE `portfolio_images` (
	`id` text PRIMARY KEY NOT NULL,
	`portfolio_id` text NOT NULL,
	`image_url` text NOT NULL,
	`caption` text,
	`display_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_portfolio_images_portfolio_id` ON `portfolio_images` (`portfolio_id`);--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`couple_name` text NOT NULL,
	`event_date` text,
	`venue_name` text NOT NULL,
	`city` text NOT NULL,
	`category` text NOT NULL,
	`cover_image` text NOT NULL,
	`story_description` text NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolios_slug_unique` ON `portfolios` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_portfolios_slug` ON `portfolios` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_portfolios_published_featured` ON `portfolios` (`is_published`,`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_portfolios_category` ON `portfolios` (`category`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`client_name` text NOT NULL,
	`wedding_title` text NOT NULL,
	`quote` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`client_photo` text,
	`event_date` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_testimonials_published` ON `testimonials` (`is_published`,`is_featured`);--> statement-breakpoint
CREATE INDEX `idx_testimonials_order` ON `testimonials` (`display_order`);--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` text PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` text DEFAULT 'Umum' NOT NULL,
	`display_order` integer DEFAULT 0 NOT NULL,
	`is_published` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_faqs_published_order` ON `faqs` (`is_published`,`display_order`);--> statement-breakpoint
CREATE INDEX `idx_faqs_category` ON `faqs` (`category`);--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`whatsapp_number` text NOT NULL,
	`email` text,
	`event_date` text NOT NULL,
	`venue_location` text NOT NULL,
	`city` text NOT NULL,
	`guest_count_estimate` integer NOT NULL,
	`interested_package_id` text,
	`budget_range` text,
	`message` text,
	`preferred_contact_method` text DEFAULT 'WHATSAPP' NOT NULL,
	`status` text DEFAULT 'NEW' NOT NULL,
	`admin_notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`interested_package_id`) REFERENCES `packages`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `idx_leads_status` ON `leads` (`status`);--> statement-breakpoint
CREATE INDEX `idx_leads_created_at` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_leads_event_date` ON `leads` (`event_date`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`updated_at` integer NOT NULL
);
