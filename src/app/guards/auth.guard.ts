import { inject, Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    private readonly router = inject(Router);
    private readonly currentUserService = inject(CurrentUserService);

    isAuthenticated = ():
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> => {
        if (!this.currentUserService.state.username) {
            this.router.navigateByUrl('/');
        }
        return true;
    };

    canActivate: CanActivateFn = this.isAuthenticated;
    canMatch: CanMatchFn = this.isAuthenticated;
}
