/**
 * Created by jokr on 01.12.16.
 */
import {Component} from '@angular/core';
import {AuthService} from "../services/AuthService";
@Component({
  selector: 'profile-page',
  template: `
    <div class="card">
          <div>Logged as {{username}}</div>
          <button md-button-raised (click)="logout()">LOGOUT</button>
    </div>`
})
export class ProfilePage {
  private username: string;


  constructor(private as: AuthService) {
    as.getUserPromise().then(a=> this.username=a.name);
  }

  private logout() {
    this.as.logout();
  }
}
