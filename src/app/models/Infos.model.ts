import { Endereco } from "./endereco.model";
import { User } from "./user.model";

export interface Infos {
	chavePIX: string;
	endereco: Endereco;
	telefone: string;
	user: User;
	cargo: string;
}