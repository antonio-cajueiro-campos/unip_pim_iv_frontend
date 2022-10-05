import { Message } from "./message.model";
import { UserHub } from "./user-hub.model";

export interface Chat {
	chatId: number;
	messagesList: Message[];
	userList: UserHub[];
}
