import { Selector } from "./selector.model";

export interface PriceSelector {
	id: string;
	title: string;
	icon: string;
	list: Selector[];
	monthlyPayment: number;
	numberOfMonths: number;
}