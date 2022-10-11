import { Selector } from "./selector.model";

export interface PriceSelector {
	title: string;
	icon: string;
	listA: Selector;
	listB: Selector;
}