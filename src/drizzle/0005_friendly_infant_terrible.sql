CREATE TABLE `fornecedor_insumo` (
	`fornecedor_id` integer NOT NULL,
	`insumo_id` integer NOT NULL,
	`preco` integer,
	`created_at` text,
	`id_user` integer NOT NULL,
	PRIMARY KEY(`fornecedor_id`, `insumo_id`),
	FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`insumo_id`) REFERENCES `insumo`(`id`) ON UPDATE no action ON DELETE cascade
);
