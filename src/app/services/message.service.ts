import { HttpErrorResponse } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpStatus } from './constants/http-status';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	constructor() { }

	public async handleException(response, inputs: any[] = []) {
		console.log(HttpStatus.BadRequest(response));

		//HttpErrorResponse to DefaultResponse
		
		if (HttpStatus.BadRequest(response) && response.error.errors) {
			this.inputException(response, inputs);
		}

		if (HttpStatus.BadRequest(response)) {
			this.toast(response.error.message, "error");
		}
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

				this.toast("Até logo!", "success")

				// Swal.fire(
				//   'Deleted!',
				//   'Your file has been deleted.',
				//   'success'
				// )
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
	public inputException(response: HttpErrorResponse, inputs: any[]) {

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

	public inputExceptionHandlers(response: HttpErrorResponse, inputs: ElementRef[]) {
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
