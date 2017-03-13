/**
 * Created by jokr on 04.11.16..
 */
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, } from "@angular/router";
import {FirebaseListObservable} from "angularfire2";
import {MemeService} from "../services/MemeService";
import {Meme} from "../models/Meme";
import {AuthService} from "../services/AuthService";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'list',
  template: `
    <div class="meme-card" *ngFor="let meme of memes | async">
        <meme-card [meme]="meme"></meme-card>
    </div>`
})
export class MemesList implements OnInit {
  private type: string;
  private memes: Observable<Meme[]>;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private ms: MemeService, private as: AuthService) {
    this.setType(activatedRoute.snapshot.params["type"]);
    this.getMemes();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.setType(params['type']);
      this.getMemes();
    });
  }

  private getMemes() {
    if (this.type == 'dank') {
      this.memes = this.ms.getDankMemesObservable();
    } else if (this.type == 'fresh') {
      this.memes = this.ms.getFreshMemes();
    } else if (this.type == 'random') {
      this.memes = this.ms.getRandomMemes();
    } else if (this.type == 'subbed') {

    }
  }


  private setType(type: string) {
    if (type=='dank' || type=='subbed' || type=='fresh' || type=='random'){
      this.type = type;
    } else {
      this.router.navigate(['./404']);
    }
  }


}
