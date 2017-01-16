/**
 * Created by JoKr on 10/27/2016.
 */
import {Component, AfterViewInit} from '@angular/core';
import {ScrollSpyDirective, ScrollSpyService} from 'ng2-scrollspy';
import {AuthService} from "../services/AuthService";
import {AuthGuard} from "../guards/AuthGuard";
//import $ from 'jquery';
let $ = require('jquery');


@Component({
  selector: 'header',
  template: `
    <div class="navbar header row">
      <marquee class="marquee-container col-xs-12" behaviour="scroll">
        <span class="marquee-text">{{slidingMarquee}}</span>
      </marquee>
      <span class="col-xs-2">
          <img class="header-image"  src="/assets/images/logo.svg" />
      </span>
      <div class="col-xs-10 empty-fill">&nbsp;</div>
      <a routerLink="/memes/dank">
        <span class="header-item offset-xs-1 offset-md-0 col-xs-2 col-md-1">
          <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Dank</span></span>
      </a>
      <a routerLink="/memes/fresh">
        <span class="header-item col-xs-2 col-md-1">
          <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Fresh</span></span>
      </a>
      <a routerLink="/memes/subbed">
        <span class="header-item col-xs-2 col-md-1" href="/memes/subbed">
          <span class="header-label">&nbsp;&nbsp;Subbed</span></span>
      </a>
      <a routerLink="/memes/random">
        <span class="header-item col-xs-2 col-md-1" href="/memes/random">
          <span class="header-label">&nbsp;&nbsp;Random</span></span>
      </a>
      <a routerLink="/profile">
        <span class="header-item offset-xs-1 offset-md-0 col-xs-2 col-md-1">
          <span class="header-label" data-toggle="tooltip" data-delay="1" data-html="true" 
          title="{{profileTooltip}}">
          &nbsp;&nbsp;&nbsp;Profile</span></span>
      </a>
      <a routerLink="/messages">
        <span class="header-item col-xs-2 col-md-1">
          <span class="header-label">Messages</span></span>
      </a>
      <a routerLink="/search">
        <span class="header-item col-xs-2 col-md-1">
          <span class="header-label">&nbsp;&nbsp;&nbsp;Search</span></span>
      </a>
      <a routerLink="/help">
        <span class="header-item col-xs-2 col-md-1">
          <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Help</span></span>
      </a>
    </div>
    <div class="navbar collapse-header" scrollSpy [scrollSpyAffix]="{topMargin: 210}">
        <span class="billabong collapse-header-title" (click)="scrollToTop()">Memestagram</span>
        <span class="collapse-header-item">Dank</span>
        <span class="collapse-header-item">Fresh</span>
        <span class="collapse-header-item">Subbed</span>
        <span class="collapse-header-item">Random</span>
        <span class="collapse-header-item">Profile</span>
        <span class="collapse-header-item">Messages</span>
    </div>

`
})
export class Header {
  private slidingMarquee: string;
  private profileTooltip: string = "";

  constructor(private as: AuthService) {
    this.as.getUserPromise().then(u=>{
      this.setLoggedInMarquee(u.username);
    });

    this.as.authObservable().subscribe(u => {
        if (u == null) {
          this.setWelocomeMarquee();
        }
      }
    );

    this.as.getUserObservable().subscribe(u=>{
     this.setLoggedInMarquee(u.username);
    });
  }

  private setWelocomeMarquee(){
    this.slidingMarquee = "Welcome to Memestagram. Please, login to experience memes a new way!";
    this.profileTooltip = "?";
  }

  private setLoggedInMarquee(username: string) {
    this.slidingMarquee = `Make memes great again! Welcome ` + username + ` to Memestagram! Follow us at @memestagram
          once we actually make twitter.`;
    this.profileTooltip = "Logged as " + username;
  }

  private scrollToTop() {
    $("html, body").animate({scrollTop: 0}, "slow");
  }

}
