import { Endereco } from "./endereco.model";
import { User } from "./user.model";

export interface Cliente {
	chavePIX: string;
	endereco: Endereco;
	telefone: string;
	user: User;
}