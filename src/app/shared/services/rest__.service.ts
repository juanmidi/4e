import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const tokenName = 'token';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public isLogged$ = new BehaviorSubject(false);
  public url = `${environment.apiBaseUrl}`;
  public user;

  constructor(private http: HttpClient) { }

public get(url: string) {
  return this.http.get(url);
}



public isAuthenticated(): boolean {
  return !!localStorage.getItem(tokenName);
}

public login(data): Observable<any> {
  console.log('data');
  console.log('monoooooooo');
  console.log(data);
  return this.http.post(`${this.url}/auth`, data)
    .pipe(
      map((res: { user: any, token: string }) => {
        this.user = res.user;
        localStorage.setItem(tokenName, res.token);
        this.isLogged$.next(true);
        return this.user;
      }),
    );
}

public logout() {
  // localStorage.clear();
  // this.user = null;
  // this.isLogged$.next(false);
  // return of(false);
}

}
