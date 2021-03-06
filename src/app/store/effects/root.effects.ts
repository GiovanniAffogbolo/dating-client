import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";

import { LocalStorageService } from "@core/services";
import { AuthActions } from "@auth/store/actions";

@Injectable()
export class RootEffects {

  constructor(private actions$: Actions, private local: LocalStorageService) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        const cookieExists = !!this.local.get('user');
        let user = null;
        if (cookieExists) {
          user = JSON.parse(this.local.get('user'));
        }
        return of(AuthActions.getUserLocal({ user }))
      })));
}
