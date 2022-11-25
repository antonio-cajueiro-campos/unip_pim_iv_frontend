import { Endereco } from "./endereco.model";
import { User } from "./user.model";

export interface Infos {
	id: number;
	chavePIX: string;
	endereco: Endereco;
	telefone: string;
	user: User;
	cargo: string;
}