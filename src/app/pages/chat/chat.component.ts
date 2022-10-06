import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { Message } from 'src/app/models/message.model';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { LayoutService } from 'src/app/services/layout.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
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
  public chatList: Chat[] = [];
  public userId: number = 0;
  public isWriting: Subject<string> = new Subject<string>();
  public typingDelayMillis = 700;
  public selectedChatId: number = 0;

  constructor(public router: Router, public route: ActivatedRoute, public messageService: MessageService, public layoutService: LayoutService, public requestService: RequestService, public userService: UserService, private formBuilder: FormBuilder) {
    this.getUserInfo((_: string, userId: number, role: string) => {
      this.connection = requestService.signalR(userId, role);
    })

    this.startConnection();
  }

  startConnection() {
    try {
      this.connection.on('newMessage', (message: Message, chatId: number) => {
        this.renderMessageOnChat(message, chatId)
      });

      this.connection.on('closeSession', () => {
        this.closeSession();
      });

      this.connection.on('isWriting', (username: string, userId: number, chatId: number) => {
        this.renderIsWriting(username, userId, chatId);
      });

      this.connection.on('initCliente', (selectedChatId: number) => {
        this.selectedChatId = selectedChatId;
      });

      this.connection.on('startedChats', (startedChatList: Chat[]) => {
        this.chatList = startedChatList;
      });
      
      this.connection.on('previousMessages', (messages: Message[]) => {
        this.getChatSelected(this.selectedChatId).messagesList = messages;
        this.getChatSelected(this.selectedChatId).messagesList.forEach(message => {
          message.timestamp = this.formatDate(message.timestamp)
        });
        this.getChatSelected(this.selectedChatId).messagesList.reverse()
        this.layoutService.hideLoader();
      });

      this.layoutService.showLoader();

      this.connection.start()
        .then(() => {
          this.getUserInfo((_: string, userId: number) => {
            this.userId = userId;
            this.getChatMode((params: any) => {
              this.connection.send("initCliente", userId, params.type);
              console.warn("Chat conectado", this.connection);
            });
          })
        })
    }
    catch (err) {
      console.error(err);
    }
  }

  ngOnDestroy() {
    this.messageForm.reset()
  }

  getChatSelected(chatId: number): Chat {
    return this.chatList.filter(c => {
      return c.chatId === chatId
    })[0];    
  }

  getChatMode(callback: Function) {
    this.route.queryParams.subscribe(params => {
      callback(params)
    });
  }

  sendMessage() {
    this.getUserInfo((username: string, userId: number) => {
      var text = this.messageForm.value.text;
      if (text != "" && text != null) {

        var newMessage = {
          ownerId: userId,
          text: text,
          username: username,
          type: "Message"
        }

        this.connection.send("newMessage", newMessage, this.selectedChatId)
          .then(() => { this.messageForm.reset() })
      }
    })
  }

  isWritingNotifyAll() {
    var typing = false;
    this.getUserInfo((username: string, userId: number) => {
      if (typing === false) {
        this.delay(() => {
          this.connection.send("isWriting", "", userId, this.selectedChatId)
          typing = false;
        }, this.typingDelayMillis);
        typing = true;
        this.connection.send("isWriting", username, userId, this.selectedChatId)
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

  getUserInfo(callback: Function) {
    this.userService.infos$.pipe(
      tap(infos => {
        callback(infos ? infos.user.name : "Guest", infos ? infos.user.id : 0, infos ? infos.user.credential.role : "Cliente");
      })
    ).subscribe()
  }

  renderMessageOnChat(message: Message, chatId: number) {
    message.timestamp = this.formatDate(message.timestamp);
    this.getChatSelected(chatId).messagesList.unshift(message)    
  }

  renderIsWriting(username: string, userId: number, chatId: number) {    
    var isWritingElement = document.getElementById("isWriting");
    if (username != "" && userId != this.userId && chatId == this.selectedChatId) {
      if (isWritingElement)
      isWritingElement.classList.add("animate")
      this.isWriting.next(username + " está digitando");
    } else if (userId != this.userId) {
      if (isWritingElement)
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
    this.messageService.popupInfo("A sessão foi encerrada.", () => {
      this.router.navigateByUrl('/services');
    }, "")
  }
}
