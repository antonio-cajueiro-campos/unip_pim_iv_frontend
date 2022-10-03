import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import * as signalR from '@microsoft/signalr';
import { Message } from 'src/app/models/message.model';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

  private connection: signalR.HubConnection = null;
  public messageForm = this.formBuilder.group({
    text: null
  });
  public messages: Message[] = []
  public userId: number = 0;
  public isWriting: Subject<string> = new Subject<string>();
  public typingDelayMillis = 700;

  constructor(public router: Router, public messageService: MessageService, public layoutService: LayoutService, public requestService: RequestService, public userService: UserService, private formBuilder: FormBuilder) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.requestService.BACKEND_BASE_URL}/websocketchat`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.startConnection();
  }

  startConnection() {
    try {
      this.connection.on('newMessage', (message: Message) => {
        this.renderMessageOnChat(message)
      });

      this.connection.on('closeSession', () => {
        this.closeSession();
      });

      this.connection.on('isWriting', (userName: string, userId: number) => {
        this.renderIsWriting(userName, userId);
      });

      this.connection.on('previousMessages', (messages: Message[]) => {
        this.messages = messages;
        this.messages.forEach(message => {
          message.timestamp = this.formatDate(message.timestamp)
        });
        this.messages.reverse()
        this.layoutService.hideLoader();
      });

      this.layoutService.showLoader();

      this.connection.start()
        .then(() => {
          this.getUsername((username: string, userId: number) => {
            this.userId = userId;
            this.connection.send("newUser", username, userId, this.connection.connectionId, "Cliente")
            console.warn("Chat conectado", this.connection);
          })
        })
    }
    catch (err) {
      console.error(err);
    }
  }

  sendMessage() {
    this.getUsername((username: string, userId: number) => {
      console.log(userId);
      
      if (this.messageForm.value.text != "" && this.messageForm.value.text != null) {

        var newMessage = {
          userId: userId,
          text: this.messageForm.value.text,
          userName: username,
          type: "Message"
        }

        this.connection.send("newMessage", newMessage)
          .then(() => { this.messageForm.reset() })        
      }
    })
  }

  isWritingNotifyAll() {
    var typing = false;
    this.getUsername((username: string, userId: number) => {
      if (typing === false) {
        this.delay(() => {          
          this.connection.send("isWriting", "", userId)
          typing = false;
        }, this.typingDelayMillis);
        typing = true;
        this.connection.send("isWriting", username, userId)
      }
    })
  }

  delay = (() => {
    let timer = null;
    return (callback: Function, ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  getUsername(callback: Function) {
    this.userService.infos$.pipe(
      tap(infos => {
        callback(infos ? infos.cliente.user.name : "Guest", infos ? infos.cliente.user.id : 0);
      })
    ).subscribe()
  }

  renderMessageOnChat(message: Message) {
    message.timestamp = this.formatDate(message.timestamp);
    this.messages.unshift(message);
  }

  renderIsWriting(userName: string, userId: number) {
    if (userName != "" && userId != this.userId) {
      document.getElementById("isWriting").classList.add("animate")
      this.isWriting.next(userName + " está digitando");
    } else if (userId != this.userId) {
      document.getElementById("isWriting").classList.remove("animate")
    }
  }

  formatDate(timestamp: string): string {
    var time = new Date(timestamp)
    var hours = time.getHours()
    var minutes = time.getMinutes()
    var hoursFixed = hours == 0 ? '0' + hours : hours
    var minutesFixed = minutes <= 9 ? '0' + minutes : minutes;
    return `${hoursFixed}:${minutesFixed}`;
  }

  closeSession() {
    this.connection.stop();
    this.messageService.popup("A sessão foi encerrada.", "info", () => {
      this.router.navigateByUrl('/');
    }, "")
    // deixar todas as msgs cinzas
    // deixar o botao e a text box desabilitadas
    // mostrar botao de impressaod e chat
  }

  encerrarSessaoTest() {
    console.log("a");
    
    this.connection.send("closeSession")
  }
}
