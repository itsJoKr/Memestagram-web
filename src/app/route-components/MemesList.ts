/**
 * Created by jokr on 04.11.16..
 */
import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router, } from "@angular/router";
import {FirebaseListObservable} from "angularfire2";
import {MemeService} from "../services/MemeService";
import {Meme} from "../models/Meme";
import {AuthService} from "../services/AuthService";

@Component({
  selector: 'list',
  template: `
    <div class="meme-card" *ngFor="let meme of memes | async">
        <meme-card [meme]="meme"></meme-card>
    </div>`
})
export class MemesList {
  private type: string;
  private memes: FirebaseListObservable<Meme[]>;


  constructor(activatedRoute: ActivatedRoute, private router: Router, private ms: MemeService, private as: AuthService) {
    this.setType(activatedRoute.snapshot.params["type"]);
    this.memes = ms.getDankMemes();
  }

  private ping() {
    this.as.ping();
  }

  private setType(type: string) {
    if (type=='dank' || type=='subbed' || type=='fresh' || type=='random'){
      this.type = type;
    } else {
      this.router.navigate(['./404']);
    }
  }


}
