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
    protected readonly destroyRef = inject(DestroyRef);

    private stateInitialized = false;
    private stateSubject$: BehaviorSubject<State> | undefined;

    get state(): State {
        return (this.stateSubject$ as any).getValue();
    }

    get state$(): Observable<State> {
        return (this.stateSubject$ as any)
            .asObservable()
            .pipe(filter((state) => state !== null));
    }

    protected createState(initialState: State): void {
        if (this.stateInitialized) {
            throw new Error(`State already initialized`);
        }
        this.stateInitialized = true;
        this.stateSubject$ = new BehaviorSubject<State>(initialState);
    }

    protected setState(stateChange: Partial<State>): void {
        const nextState = {
            ...this.state,
            ...stateChange,
        };

        if (this.stateSubject$) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.stateSubject$.next(nextState);
        }
    }

    protected observeStateChange<Key extends keyof State>(
        stateProperty: Key,
    ): Observable<State[Key]> {
        return this.state$.pipe(
            filter((state): state is State => !!state),
            map((state) => state[stateProperty]),
            distinctUntilChanged(),
            takeUntilDestroyed(this.destroyRef),
        );
    }

    protected mapObservableToState<Key extends keyof State>(
        stateProperty: Key,
        stream$: Observable<State[Key]>,
    ): void {
        stream$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
            const stateToUpdate: Partial<State> = {};
            stateToUpdate[stateProperty] = value;
            this.setState(stateToUpdate);
        });
    }
}
