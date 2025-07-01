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
CREATE TABLE `insumos_receita` (
	`id` integer PRIMARY KEY NOT NULL,
	`idReceita` integer NOT NULL,
	`idInsumo` integer NOT NULL,
	`quantidade` integer NOT NULL,
	FOREIGN KEY (`idReceita`) REFERENCES `receita`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `receita` (
	`id` integer PRIMARY KEY NOT NULL,
	`idProduto` integer NOT NULL,
	`quantProdutoGera` integer NOT NULL,
	`nome` text NOT NULL,
	`unidadeDeMedida` text NOT NULL,
	`id_user` integer NOT NULL
);
