import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private _isLoading$ = new BehaviorSubject(false);

  isLoading$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(isLoading => {
      if(!isLoading) {
        return of(false)
      }
      return of(true)
    })
  );

  start() {
    this._isLoading$.next(true)
  }
  finish() {
    this._isLoading$.next(false)
  }
}
