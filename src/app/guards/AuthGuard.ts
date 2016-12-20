import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/AuthService";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private as: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.as.authObservable().subscribe(u => {
        if (u == null) {
          this.router.navigate(['/login']);
        }
      }
    );

    return this.as.authObservable().map(user => user!=null);
  }
}
