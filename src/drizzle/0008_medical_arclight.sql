ALTER TABLE `insumo` RENAME COLUMN `nome` TO `name`;--> statement-breakpoint
ALTER TABLE `insumo` ADD `quantidadeEstoque` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `insumo` ADD `custo` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `insumo` DROP COLUMN `idFornecedor`;--> statement-breakpoint
ALTER TABLE `insumo` DROP COLUMN `quantidadeDisponivel`;