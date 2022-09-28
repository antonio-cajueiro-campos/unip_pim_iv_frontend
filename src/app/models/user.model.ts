import { Credential } from "./credential.model";
export interface User {
    credential: Credential;
    document: string;
    id: number;
    name: string;
    registrationDate: string;
}
