/**
 * Created by jokr on 04.11.16..
 */
import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, } from "@angular/router";

@Component({
  selector: 'list',
  template: `
    <div class="meme-card" *ngFor="let item of list">
        <meme-card></meme-card>
    </div>`
})
export class MemesList {
  private type: string;
  private list: number[];



  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    this.setType(activatedRoute.snapshot.params["type"]);
    this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  private setType(type: string) {
    if (type=='dank' || type=='subbed' || type=='fresh' || type=='random'){
      this.type = type;
    } else {
      this.router.navigate(['./404']);
    }
  }


}
