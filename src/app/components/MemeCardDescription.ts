import {Component} from '@angular/core';

@Component({
  selector: 'meme-card-desc',
  styleUrls: ['../../assets/css/meme.css'],
  template: `
  <div class="meme-card-desc row">
      <div class="col-xs-8">Meme title</div>
      <div class="col-xs-4">17x o</div>
  </div>`
})
export class MemeCardDescription {


  constructor() {
    //
  }
}
