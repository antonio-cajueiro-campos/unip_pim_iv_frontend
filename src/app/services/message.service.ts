import { HttpErrorResponse } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { DefaultResponse } from '../models/default-response.model';
import { HttpStatus } from './constants/http-status';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	constructor() { }

	public async handle(response: HttpErrorResponse | DefaultResponse | any, inputs: any[] = []) {
		
		if (HttpStatus.BadRequest(response) && this.instanceOfDefaultResponse(response)) {
			this.toast(response.message, "error");
		}

		if (HttpStatus.BadRequest(response) && response instanceof HttpErrorResponse && response.error.errors) {
			this.inputErrorHandle(response, inputs);
		}

		if (HttpStatus.BadRequest(response) && response instanceof HttpErrorResponse && response.error.message) {
			this.toast(response.error.message, "error");
		}
		
		if (HttpStatus.ServerError(response) && response instanceof HttpErrorResponse && response.error.message) {
			this.serverErrorHandle(response.error.message);
		}		

		if (HttpStatus.Unknown(response) && response instanceof HttpErrorResponse) {
			this.serverErrorHandle(response.message);
		}
	}

	public async present(title: string, text: string = "", icon: any) {
		await Swal.fire({
			title, text, icon
		});
	}

	public async popup(title: string, icon: any, callback: any, text: string = "") {
		await Swal.fire({
			title, text, icon,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não'
		}).then((result) => {
			if (result.isConfirmed) {
				callback();

				this.toast("Até logo!", "success");
			}
		});
	}

	public async toast(message: string, icon: any, timer: number = 3000) {
		if (message == "Timeout has occurred") {
			message = "Erro ao se conectar com o servidor.";
		}
		if (message.startsWith("Http failure response for")) {
			message = "Erro ao alcançar serviço, verifique sua conexão de internet.";
		}
		const Toast = Swal.mixin({
			toast: true,
			position: 'bottom-end',
			showConfirmButton: false,
			timer,
			customClass: 'swal-wide',
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})

		Toast.fire({
			icon,
			title: message
		})
	}

	private instanceOfDefaultResponse = (o: any): o is DefaultResponse  => 'data' in o;

	private serverErrorHandle(message: string) {
		console.log(message);
		
		switch(true) {
			case message.includes("Microsoft.Data.SqlClient.SqlException"):
				this.present("Server Error", "Erro no serviço de banco de dados, entre em contato com um administrador do sistema ou tente novamente mais tarde.", "error");
				break;
			case message.includes("Timeout has occurred"):
				this.present("Timeout", "Tempo de comunicação com o servidor se esgotou, tente novamente mais tarde. Se o problema persistir contate um administrador.", "error");
				break;
			case message.includes("Http failure response for"):
				this.present("Connection Error", "Erro de conexão com o servidor, verifique sua rede ou tente novamente mais tarde.", "error");
				break;
		}
	}

	private inputErrorHandle(response: HttpErrorResponse, inputs: any[]) {

		var inputsWithError = []
		for (let inputIdWithError in response.error.errors) {
			inputsWithError.push(inputIdWithError);
		}

		for (let input of inputs) {
			var element: HTMLElement;
			if (input?.nativeElement)
				element = input.nativeElement;
			else if (input?.element)
				element = input.element;

			if (element) {
				if (element.id == inputsWithError[inputsWithError.indexOf(element.id)]) {
					let errorMessage: string = response.error.errors[inputsWithError[inputsWithError.indexOf(element.id)]].toString();
					let errorMessages: string[];

					if (errorMessage.includes(",")) {
						errorMessages = errorMessage.split(",");
						errorMessage = "";
						for (let individual of errorMessages) {
							errorMessage += `${individual}<hr>`;
						}
						errorMessage = errorMessage.slice(0, -4)
					}

					element.focus();
					element.setAttribute('style', 'border: red 1px solid!important');
					
					this.toast(errorMessage, "error");
				} else {
					element.setAttribute('style', 'border: #ccc 1px solid!important');
				}
			} else {
				console.log("Erro ao carregar elemento, elemento indefinido", element);
			}
		}
	}

	public inputExceptionHandlerTest(response: HttpErrorResponse, inputs: ElementRef[]) {
		console.log(inputs)

		var inputsWithError = []
		for (let inputIdWithError in response.error.errors) {
			inputsWithError.push(inputIdWithError);
		}

		for (let input of inputs) {
			if (input.nativeElement.id == inputsWithError[inputsWithError.indexOf(input.nativeElement.id)]) {
				let msgError = response.error.errors[inputsWithError[inputsWithError.indexOf(input.nativeElement.id)]];
				input.nativeElement.focus();
				input.nativeElement.setAttribute('style', 'border: red 1px solid!important');
				msgError = msgError.toString()


				if (msgError.includes(",")) {
					let msgErrors = msgError.split(",");
					msgError = "";
					for (let msg of msgErrors) {
						msgError += msg + "<hr>"
					}

					msgError = msgError.slice(0, -4)
					console.log(msgError);
				}
				this.toast(msgError, "error");
			} else {
				input.nativeElement.setAttribute('style', 'border: #ccc 1px solid!important');
			}
		}
	}
}
