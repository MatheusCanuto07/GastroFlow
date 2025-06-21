CREATE TABLE `produto` (
	`id` integer PRIMARY KEY NOT NULL,
	`idProduto` integer NOT NULL,
	`quantProdutoGera` integer NOT NULL,
	`nome` text NOT NULL,
	`unidadeDeMedida` text NOT NULL
);
