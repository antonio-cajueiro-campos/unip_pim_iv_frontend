import { Message } from "./message.model";
import { UserHub } from "./user-hub.model";

export interface Chat {
	chatId: number;
	type: string;
	userList: UserHub[];
	messagesList: Message[];
}
