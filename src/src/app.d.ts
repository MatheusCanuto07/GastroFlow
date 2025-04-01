import type { User } from "$lib/server/user";
import type { Session } from "$lib/server/session";

declare global {
  // TODO: Olhar com o André o que isso faz
	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}
}

export {};