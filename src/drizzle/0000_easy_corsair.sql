CREATE TABLE `transactionsTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`banco` text,
	`tipo` text NOT NULL,
	`data` text NOT NULL,
	`valor` integer NOT NULL,
	`categoria` text NOT NULL,
	`recorrencia` integer,
	`dataRecorrencia` integer,
	`descricao` text,
	`idUsuario` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `usuarioTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`saldo` integer NOT NULL
);
