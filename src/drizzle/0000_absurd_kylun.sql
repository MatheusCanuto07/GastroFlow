CREATE TABLE `compras` (
	`id` integer PRIMARY KEY NOT NULL,
	`idFornecedor` integer NOT NULL,
	`idInsumo` integer NOT NULL,
	`date` text NOT NULL,
	`created_at` text,
	FOREIGN KEY (`idFornecedor`) REFERENCES `fornecedor`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `fornecedor` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contato` text NOT NULL,
	`tipo` text NOT NULL,
	`email` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE TABLE `insumo` (
	`id` integer PRIMARY KEY NOT NULL,
	`idFornecedor` integer NOT NULL,
	`nome` text NOT NULL,
	`categoria` text,
	`dataValidade` text NOT NULL,
	`quantidadeDisponivel` text NOT NULL,
	`created_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fornecedor_email_unique` ON `fornecedor` (`email`);