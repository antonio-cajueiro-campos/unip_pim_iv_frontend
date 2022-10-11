import { Selector } from "./selector.model";

export interface PriceSelector {
	title: string;
	icon: string;
	list: Selector[];
	total: number;
}