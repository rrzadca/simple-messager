import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { Message } from './models/message.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class MessagesService {
    private newMessageSubject$ = new Subject<Message>();

    get newMessage$() {
        return this.newMessageSubject$.asObservable();
    }

    listenForMessage(): void {
        // simulate incoming messages
        interval(50000).subscribe(() => {
            this.newMessageSubject$.next({
                deviceId: uuidv4(),
                test: 'Lorem ipsum',
                username: 'John Doe',
                receivedAt: new Date(),
            });
        });
    }

    sendMessage(message: Message): void {
        // call API to send message
        // show message on UI
        this.newMessageSubject$.next(message);
    }
}
