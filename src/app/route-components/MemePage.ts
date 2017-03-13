/**
 * Created by jokr on 01.12.16.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot} from "@angular/router";
import {Meme} from "../models/Meme";
import {MemeService} from "../services/MemeService";
import {FirebaseListObservable} from "angularfire2";
import {Comment} from "../models/Comment";
import {AuthService} from "../services/AuthService";
@Component({
  selector: 'meme-page',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
    <span class="row">
      <img class="meme-img" src="../../assets/images/{{img}}" alt="Sample meme">
      <!--<meme-card-desc></meme-card-desc>-->
      <div class="meme-card-desc row">
        <div class="col-xs-8">{{meme.title}}</div>
        <div class="col-xs-4 actions-right">{{meme.likes}} <md-icon (click)="toggleLike()" class="meme-icon">thumb_up</md-icon></div>
      </div>
      
      <div class="meme-card-poster row">
        <md-icon>person_pin</md-icon>
        <span>{{meme.user.username}}</span>
        <button md-button class="pull-xs-right" (click)="openUser()"><md-icon>arrow_forward</md-icon></button>
      </div>
      
      <div class="comments-container offset-xs-2 col-xs-8">
        <div class="row comment-input">
          <div class="col-xs-9">
            <md-input-container style="width: 100%;">
              <input #comment type="text" mdInput placeholder="Comment here"/>
            </md-input-container>
          </div>
          <div class="col-xs-2">
            <button md-button (click)="postComment(comment.value)"><md-icon>send</md-icon></button>
          </div>
        </div>
        <comment-card [comment]="comment" *ngFor="let comment of comments | async"></comment-card>
      </div>
  </span>`
})
export class MemePage implements OnInit {
  private meme: Meme;
  private memeUid: string;
  private img: string = 'aliens.jpg';
  private comments: FirebaseListObservable<Comment[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ms: MemeService, private as: AuthService) {
    this.memeUid = activatedRoute.snapshot.params["uid"];
  }

  ngOnInit(): void {
    this.meme = this.activatedRoute.snapshot.data[0];
    this.getComments();
  }

  private getComments() {
    this.comments = this.ms.getComments(this.meme.$key);
  }

  private postComment(content: string) {
    this.as.getUserPromise().then(user => {
      let c = new Comment();
      c.content = content;
      c.poster = user.username;
      c.posterKey = user.$key;
      this.ms.postComment(c, this.meme.$key);
    });
  }

  private openUser() {
    let key = this.meme.user.key;
    this.router.navigate(['/user', key]);
  }

  private toggleLike() {
    this.as.getUserPromise().then(user=> {
      this.ms.toggleLike(user.$key, this.meme);
    });
  }

}
