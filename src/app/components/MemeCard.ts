import {Component, Input, OnInit} from '@angular/core';
import {Meme} from "../models/Meme";
import {Route, Router} from "@angular/router";
import {MemeService} from "../services/MemeService";
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'meme-card',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
  <span>
      <img (click)="openMemePage()" class="meme-img" src="../../assets/images/{{img}}" alt="Sample meme">
      <!--<meme-card-desc></meme-card-desc>-->
      <div class="meme-card-desc row">
        <div class="col-xs-8">{{meme.title}}</div>
        <div class="col-xs-4 actions-right">{{meme.likes}}
         <md-icon (click)="toggleLike()" class="meme-icon">thumb_up</md-icon></div>
      </div>
  </span>`
})
export class MemeCard implements OnInit{
  @Input() meme: Meme;
  private img: string;
  private tempImgs = ['aliens.jpg', 'matrixmeme.jpg', 'picardwtf.png'];

  constructor(private router: Router, private as: AuthService, private ms: MemeService) {
    let randIndex = Math.floor((Math.random() * 3));
    this.img = this.tempImgs[randIndex];
  }

  private openMemePage() {
    // this.router.navigate('/meme/' + this);
    this.router.navigate(['/meme', this.meme.$key]);
  }

  private toggleLike() {
    this.as.getUserPromise().then(user=> {
      this.ms.toggleLike(user.$key, this.meme);
    })
  }

  ngOnInit(): void {
  }
}
