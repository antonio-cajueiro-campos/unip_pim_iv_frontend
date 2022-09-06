import { Injectable } from '@angular/core';
import { StorageKeys } from './enums/StorageKeys';

@Injectable({
	providedIn: 'root'
})
export class DataManagerService {

	public localStorage: Storage;
	public readonly UNIQUE_APP_STORATE: string = "tsb-portal-storage";

	constructor() {
		this.localStorage = window.localStorage;
	}

	public getData(key: StorageKeys): any {
		if (this.isLocalStorageSupported) {
			return JSON.parse(this.localStorage.getItem(key + this.UNIQUE_APP_STORATE));
		}
		return null;
	}

	public setData(key: StorageKeys, value: any): boolean {
		if (this.isLocalStorageSupported) {
			this.localStorage.setItem(key + this.UNIQUE_APP_STORATE, JSON.stringify(value));
			return true;
		}
		return false;
	}

	public removeData(key: StorageKeys): boolean {
		if (this.isLocalStorageSupported) {
			this.localStorage.removeItem(key + this.UNIQUE_APP_STORATE);
			return true;
		}
		return false;
	}

	get isLocalStorageSupported(): boolean {
		return !!this.localStorage
	}
}
