import { Component } from '@angular/core';

@Component({
  selector: 'meme-card',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
  <span>
      <img class="meme-img" src="../../assets/images/{{img}}" alt="Sample meme">
      <meme-card-desc></meme-card-desc>
  </span>`
})
export class MemeCard {
  private img: string;
  private imgs = ['aliens.jpg', 'matrixmeme.jpg', 'picardwtf.png'];

  constructor() {
    let randIndex = Math.floor((Math.random() * 3));
    this.img = this.imgs[randIndex];
  }
}
