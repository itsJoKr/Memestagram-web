/**
 * Created by jokr on 01.12.16.
 */
import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import * as generator from "username-generator";
import {AuthService} from "../services/AuthService";
import {LoginType} from "../models/ThisUser";
import {Router} from "@angular/router";

@Component({
  selector: 'login-page',
  template: `
    <div class="card">
          <div>Login here:</div>
          <input [(ngModel)]="unameInput" type="text" #uname/>
          <button md-raised-button (click)="loginAnon(uname)">LOGIN AS ANON</button>
    </div>`
})
export class LoginPage implements OnInit{
  private unameInput;

  constructor(private af: AngularFire, private as: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.unameInput = generator.generateUsername("-")
  }

  private loginAnon(uname: string) {
    if (uname.length < 0) return;

    var u:any = this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });

    this.as.loginUser(u.uid, uname, LoginType.Anon);
    this.router.navigate(['./memes/dank']);

  }
}
