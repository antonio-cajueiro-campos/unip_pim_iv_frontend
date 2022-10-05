import { Message } from "./message.model";

export interface UserHub {
	userId: number;
	userConnectionId: string;
	userName: string;
	role: string;
}
