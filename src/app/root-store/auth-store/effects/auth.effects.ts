import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from "rxjs";

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_REQUEST),
      exhaustMap(action =>
        this.authService.login(action.credentials).pipe(
          tap(data => console.log(data)),
          map(user => AuthActions.LOGIN_SUCCESS({ user })),
          catchError(error => of(AuthActions.LOGIN_FAILURE(error)))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_REQUEST),
      exhaustMap(action =>
        this.authService.register(action.credentials).pipe(
          tap(data => console.log(data)),
          map(user => AuthActions.REGISTER_SUCCESS({ user })),
          catchError(error => of(AuthActions.REGISTER_FAILURE(error)))
        )
      )
    )
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      tap(() => this.router.navigate(['/']))
    ), { dispatch: false });

  registerRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REGISTER_SUCCESS),
      tap(() => this.router.navigate(['/auth/login']))
    ), { dispatch: false });

  logoutRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => this.router.navigate(['/auth/login']))
    ), { dispatch: false });

}