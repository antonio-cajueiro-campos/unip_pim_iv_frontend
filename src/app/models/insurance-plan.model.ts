import { PriceSelector } from "./price-selector.model";

export interface InsurancePlan {
	selectedPrices?: PriceSelector[];
	total: number;
}
