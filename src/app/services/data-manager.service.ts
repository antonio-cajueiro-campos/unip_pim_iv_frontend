import { Injectable } from '@angular/core';
import { StorageKeys } from './enums/storage-keys';

@Injectable({
	providedIn: 'root'
})
export class DataManagerService {

	private localStorage: Storage;
	private readonly UNIQUE_APP_STORAGE: string = "tsb-portal-storage";

	constructor() {
		this.localStorage = window.localStorage;
	}

	public setData(key: StorageKeys, value: any): boolean {
		if (this.isLocalStorageSupported) {
			var stringValue = JSON.stringify(value);
			var encodedValue = btoa(stringValue);
			this.localStorage.setItem(key + this.UNIQUE_APP_STORAGE, encodedValue);
			return true;
		}
		return false;
	}

	public getData(key: StorageKeys): any {
		if (this.isLocalStorageSupported) {
			var encodedValue = this.localStorage.getItem(key + this.UNIQUE_APP_STORAGE);
			if (encodedValue == null) return null;
			var decodedValue = atob(encodedValue);
			var value = JSON.parse(decodedValue);
			return value;
		}
		return null;
	}

	public removeData(key: StorageKeys): boolean {
		if (this.isLocalStorageSupported) {
			this.localStorage.removeItem(key + this.UNIQUE_APP_STORAGE);
			return true;
		}
		return false;
	}

	get isLocalStorageSupported(): boolean {
		return !!this.localStorage
	}
}
