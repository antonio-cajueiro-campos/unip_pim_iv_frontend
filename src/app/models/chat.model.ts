import { Message } from "./message.model";
import { UserHub } from "./user-hub.model";

export interface Chat {
	chatId: string;
	messagesList: Message[];
	userList: UserHub[];
}
