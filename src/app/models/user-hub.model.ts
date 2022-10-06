import { Message } from "./message.model";

export interface UserHub {
	userId: number;
	userConnectionId: string;
	username: string;
	role: string;
}
