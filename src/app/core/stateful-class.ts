import { DestroyRef, inject } from '@angular/core';
import {
    BehaviorSubject,
    distinctUntilChanged,
    filter,
    map,
    Observable,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export abstract class StatefulClass<State> {
    private stateInitialized = false;
    private isDebugEnabled = false;

    private stateSubject$: BehaviorSubject<State> | undefined;

    get state(): State {
        return (this.stateSubject$ as any).getValue();
    }

    get state$(): Observable<State> {
        return (this.stateSubject$ as any)
            .asObservable()
            .pipe(filter((state) => state !== null));
    }

    protected enableDebug(): void {
        this.isDebugEnabled = true;
    }

    protected createState(initialState: State): void {
        if (this.stateInitialized) {
            throw new Error(`State already initialized`);
        }
        this.stateInitialized = true;
        this.stateSubject$ = new BehaviorSubject<State>(initialState);

        if (this.isDebugEnabled) {
            console.log(
                `%c ${this.constructor.name} :: createState :: `,
                'background:#6F98D0; color: black; padding:2px 20px;',
                initialState,
            );
        }
    }

    protected setState(stateChange: Partial<State>): void {
        const nextState = {
            ...this.state,
            ...stateChange,
        };

        if (this.isDebugEnabled) {
            console.log(
                `%c ${this.constructor.name} :: state :: `,
                'background:#86B5F4; color: black; padding:2px 20px;',
                nextState,
            );
        }

        if (this.stateSubject$) {
            this.stateSubject$.next(nextState);
        }
    }
}
