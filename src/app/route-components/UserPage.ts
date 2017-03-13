import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/AuthService";
import {ActivatedRoute} from "@angular/router";
import {FirebaseListObservable} from "angularfire2";
import {Meme} from "../models/Meme";
import {ThisUser} from "../models/ThisUser";
import {SocialService} from "../services/SocialService";

@Component({
  selector: 'user-page',
  styleUrls: ['../../assets/css/social.css'],
  template: `
    <div style="margin-bottom: 30px;">
    <md-card>
      <md-card-title>{{this.user.username}}</md-card-title>
      <md-card-subtitle>Profile description</md-card-subtitle>
      <md-card-content>
      
      <button md-button (click)="postComment(comment.value)"><md-icon>star_rate</md-icon></button>
      <button md-button (click)="postComment(comment.value)"><md-icon>message</md-icon></button>
      <br><br>
      This user is just another pleb. Nothing more to be said.</md-card-content>
    </md-card>

    <span class="social-label">POSTED MEMES:</span>

    <div class="meme-card" *ngFor="let meme of memes | async">
        <meme-card [meme]="meme"></meme-card>
    </div>
    </div>
    `
})
export class UserPage implements OnInit {
  private username: string;
  private memes: FirebaseListObservable<Meme[]>;
  private user: ThisUser;

  constructor(private activatedRoute: ActivatedRoute, private as: AuthService, private ss: SocialService) {
    as.getUserPromise().then(a=> this.username=a.username);
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data[0];
    this.memes = this.ss.getUserMemes(this.user.$key);
  }

  private logout() {
    this.as.logout();
  }
}
