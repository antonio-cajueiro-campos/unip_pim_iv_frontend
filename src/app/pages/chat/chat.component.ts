import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import * as signalR from '@microsoft/signalr';
import { Message } from 'src/app/models/message.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  private messages: Message[] = []
  private connection: signalR.HubConnection = null;
  public userId: number = 0;
  public messageForm = this.formBuilder.group({
    text: null
  });

  constructor(public layoutService: LayoutService, public requestService: RequestService, public userService: UserService, private formBuilder: FormBuilder) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.requestService.BACKEND_BASE_URL}/websocketchat`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.startConnection();
  }

  ngOnInit() { }

  startConnection() {
    try {
      this.connection.on('newMessage', (text: string, userName: string, userId: number) => {
        this.renderMessageOnChat({
          userId: userId,
          text: text,
          userName: userName
        })
      });

      this.connection.on('newUser', (userName: string) => {
        //enviar no chat outro usuario q entrou
      });

      this.connection.on('previousMessages', (messages: Message[]) => {
        this.messages = messages;
        this.messages.reverse()
        this.layoutService.hideLoader();
      });
      
      this.layoutService.showLoader();

      this.connection.start()
        .then(() => {
          // avisar pra quem ta na sala q o usuário atual entrou
          this.getUsername((username: string, userId: number) => {

            this.userId = userId;
            this.connection.send("newUser", username, this.connection.connectionId)
            console.warn("Chat conectado", this.connection);
          })
        })
    }
    catch (err) {
      console.error(err);
    }
  }

  sendMessage() {
    this.getUsername((username: string, id: number) => {
      if (this.messageForm.value.text != "" && this.messageForm.value.text != null)
        this.connection.send("newMessage", this.messageForm.value.text, username, id)
          .then(() => {
            this.messageForm.reset();
          })
    })
  }

  getUsername(callback: Function) {
    this.userService.infos$.pipe(
      tap(infos => {
        callback(infos ? infos.cliente.user.name : "Guest", infos ? infos.cliente.user.id : 0);
      })
    ).subscribe()
  }

  renderMessageOnChat(message: Message) {
    this.messages.unshift(message);
  }
}
