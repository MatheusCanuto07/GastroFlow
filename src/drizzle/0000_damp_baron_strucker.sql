CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `compras` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`idFornecedor` integer NOT NULL,
	`idInsumo` integer NOT NULL,
	`date` text NOT NULL,
	`created_at` text,
	FOREIGN KEY (`idFornecedor`) REFERENCES `fornecedor`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `fornecedor_insumo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fornecedor_id` integer NOT NULL,
	`insumo_id` integer NOT NULL,
	`preco` integer,
	`created_at` text,
	`id_user` integer NOT NULL,
	FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`insumo_id`) REFERENCES `insumo`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `fornecedor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`contato` text,
	`telefone` text NOT NULL,
	`tipo` text,
	`email` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text,
	`updated_at` text,
	`id_user` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `insumo_fornecedor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`insumo_id` integer NOT NULL,
	`fornecedor_id` integer NOT NULL,
	`preco` integer,
	`created_at` text,
	`id_user` integer NOT NULL,
	FOREIGN KEY (`insumo_id`) REFERENCES `insumo`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`fornecedor_id`) REFERENCES `insumo`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `insumo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`idFornecedor` integer,
	`name` text NOT NULL,
	`categoria` text,
	`dataValidade` text NOT NULL,
	`quantidadeEstoque` integer NOT NULL,
	`custo` integer NOT NULL,
	`created_at` text,
	`id_user` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `insumos_receita` (
	`id` integer PRIMARY KEY NOT NULL,
	`idReceita` integer NOT NULL,
	`idInsumo` integer NOT NULL,
	`quantidade` integer NOT NULL,
	FOREIGN KEY (`idReceita`) REFERENCES `receita`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `produto` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`unidadeDeMedida` text NOT NULL,
	`quantidadeEstoque` integer NOT NULL,
	`created_at` text,
	`updated_at` text,
	`id_user` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `receita` (
	`id` integer PRIMARY KEY NOT NULL,
	`idProduto` integer NOT NULL,
	`quantProdutoGera` integer NOT NULL,
	`nome` text NOT NULL,
	`unidadeDeMedida` text NOT NULL,
	`id_user` integer NOT NULL,
	`descricao` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fornecedor_email_unique` ON `fornecedor` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);