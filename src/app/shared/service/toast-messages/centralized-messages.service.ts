import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from "../../models/utils/message.model";


@Injectable({
  providedIn: 'root'
})
export class CentralizedMessagesService {
  private _subject = new Subject<Message>();

  constructor() {
  }

  sendMessage(message: Message) {
    this._subject.next(message);
  }

  clearMessages() {
    this._subject = new Subject<Message>();
  }

  onMessage(): Observable<any> {
    return this._subject.asObservable();
  }
}
