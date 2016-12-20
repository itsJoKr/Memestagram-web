import {Component, Input, OnInit} from '@angular/core';
import {Meme} from "../models/Meme";

@Component({
  selector: 'meme-card',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
  <span>
      <img class="meme-img" src="../../assets/images/{{img}}" alt="Sample meme">
      <!--<meme-card-desc></meme-card-desc>-->
      <div class="meme-card-desc row">
        <div class="col-xs-8">{{meme.title}}</div>
        <div class="col-xs-4 actions-right">{{meme.likes}} <i class="material-icons meme-icon">thumb_up</i></div>
      </div>
  </span>`
})
export class MemeCard implements OnInit{
  @Input() meme: Meme;
  private img: string;
  private imgs = ['aliens.jpg', 'matrixmeme.jpg', 'picardwtf.png'];

  constructor() {
    let randIndex = Math.floor((Math.random() * 3));
    this.img = this.imgs[randIndex];
  }

  ngOnInit(): void {
    console.log(this.meme);
  }
}
