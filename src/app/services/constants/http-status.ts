import { HttpErrorResponse } from "@angular/common/http";
import { DefaultResponse } from "src/app/models/default-response.model";

export class HttpStatus {
	public static Unknown(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status == 0 ? true : false;
	}

	public static Info(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status >= 100 && response.status < 200 ? true : false;
	}

	public static OK(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status >= 200 && response.status < 300 ? true : false;
	}

	public static Redirect(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status >= 300 && response.status < 400 ? true : false;
	}

	public static BadRequest(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status >= 400 && response.status < 500 ? true : false;
	}

	public static ServerError(response: HttpErrorResponse | DefaultResponse): boolean {
		return response.status >= 500 && response.status < 600 ? true : false;
	}
}