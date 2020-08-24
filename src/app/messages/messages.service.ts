import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {
  private subject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.subject.asObservable().pipe(filter(messages => messages && !!messages.length));

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }
}
