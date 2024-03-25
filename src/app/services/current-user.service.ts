import { StatefulClass } from '../core/stateful-class';
import { Injectable } from '@angular/core';

export interface CurrentUserServiceState {
    username: string | null;
    joinedAt: Date | null;
}

@Injectable({
    providedIn: 'root',
})
export class CurrentUserService extends StatefulClass<CurrentUserServiceState> {
    constructor() {
        super();

        this.createState({
            username: null,
            joinedAt: null,
        });
    }

    login(username: string): void {
        this.setState({
            username,
            joinedAt: new Date(),
        });
    }

    logout(): void {
        this.setState({
            username: null,
            joinedAt: null,
        });
    }
}
