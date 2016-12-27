/**
 * Created by jokr on 01.12.16.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'meme-page',
  template: `
    <div class="card">
          <div>Meme id: </div>
    </div>`
})
export class MemePage {
  private memeUid: string;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    this.memeUid = activatedRoute.snapshot.params["uid"];
    console.log(this.memeUid);
  }

}
