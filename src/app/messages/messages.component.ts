import { Observable } from 'rxjs';
import { MessagesService } from './messages.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  showMessages: boolean = false;
  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {}

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(tap(() => (this.showMessages = true)));
  }

  onClose() {
    this.showMessages = false;
  }
}
