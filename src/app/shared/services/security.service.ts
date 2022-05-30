import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class SecurityService {
  IsAuthorized: any;


  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();
  public url = `${environment.apiBaseUrl}`;

  // jwt ========>
  jwtToken: string;
  decodedToken: { [key: string]: any };
  // jwt <========



  constructor(
    private storeService: StorageService,
    private http: HttpClient,
    ) {
      if (this.storeService.retrieve('IsAuthorized') !== '') {
        this.IsAuthorized = this.storeService.retrieve('IsAuthorized');
        this.authSource.next(this.IsAuthorized);
      }
    }

    // jwt ========>
    // revisar this.jwtToken para ver cómo se implementa la variable global o no

    decodeToken() {
      this.jwtToken = this.GetToken();
      if (this.jwtToken) {
        this.decodedToken = jwt_decode(this.jwtToken);
      }
    }

    getDecodeToken() {
      this.jwtToken = this.GetToken();
      return jwt_decode(this.jwtToken);
    }

    getRefreshToken() {
      this.jwtToken = this.GetToken();
      return jwt_decode(this.jwtToken);
    }

    getUser() {
      this.jwtToken = this.GetToken();
      // this.decodedToken.user (email or dni)
      return this.decodedToken ? this.decodedToken.user : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        console.log('expiryTime', 1000 * expiryTime, 'new Date().getTime()', new Date().getTime() );
        console.log(((1000 * expiryTime) - (new Date()).getTime()));
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }

    minutesExpiredTime(): number {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
         return ((1000 * expiryTime) - (new Date()).getTime());
      } else {
        return 0;
      }
    }

    // jwt <========




  public GetToken(): any {
    return this.storeService.retrieve('authData');
  }



  public ResetAuthData() {
    // this.storeService.store('authData', '');
    // this.IsAuthorized = false;
    // this.storeService.store('IsAuthorized', false);
    this.storeService.clear();
  }

  public SetAuthData(token: any, refresh_token: any ) {
    this.storeService.store('authData', token);
    this.storeService.store('refresh_token', refresh_token);
    this.IsAuthorized = true;
    this.storeService.store('IsAuthorized', true);
    this.decodeToken();

    this.authSource.next(true);
  }

  public LogOff() {
    this.ResetAuthData();

    this.authSource.next(false);
  }
}
