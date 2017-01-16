/**
 * Created by jokr on 01.12.16.
 */
import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {AuthService} from "../services/AuthService";
import {LoginType} from "../models/ThisUser";
import {Router} from "@angular/router";

let generator = require('username-generator');

@Component({
  selector: 'login-page',
  template: `
    <div class="row">
      <div class="login-card col-xs-6">
            <div>Login here as gentleman:</div>
            <input [(ngModel)]="unameInput" type="text" #uname2/>
            <button md-raised-button (click)="loginGoogle(uname2.value)">
              <img src="../../assets/images/g-logo.png"/>
              ENTLEMAN
            </button>
      </div>
      <div class="login-card col-xs-6">
            <div>Login here as pleb:</div>
            <input [(ngModel)]="unameInput" type="text" #uname/>
            <button md-raised-button (click)="loginAnon(uname.value)">LOGIN AS PLEB</button>
      </div>
    
    </div>
    `
})
export class LoginPage implements OnInit{
  private unameInput;

  constructor(private af: AngularFire, private as: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    //noinspection TypeScriptUnresolvedFunction
    this.unameInput = generator.generateUsername("-")
  }

  private loginGoogle(uname: string) {
    if (uname.length < 0) return;

    var u:any = this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
    this.as.loginWithGoogle(u, uname);
  }

  private loginAnon(uname: string) {
    if (uname.length < 0) return;

    var u:any = this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
    this.as.loginAsNew(u, uname, LoginType.Anon);

  }
}
