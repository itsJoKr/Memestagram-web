/**
 * Created by JoKr on 10/27/2016.
 */
import {Component, AfterViewInit} from '@angular/core';
import {ScrollSpyDirective, ScrollSpyService} from 'ng2-scrollspy';
//import $ from 'jquery';
var $ = require('jquery');

@Component({
  selector: 'header',
  template: `
    <div class="navbar header row">
      <marquee class="marquee-container col-xs-12" behaviour="scroll">
        <span class="marquee-text">Make memes great again! Welcome to Memestagram! Follow us at @memestagram
        once we actually make twitter. <a href="http://www.google.com">Click here for google</a>, and that's it.</span>
      </marquee>
      <span class="col-xs-2">
          <img class="header-image"  src="/assets/images/logo-e.svg" />
      </span>
      <div class="col-xs-10 empty-fill">&nbsp;</div>
      <span class="header-item offset-xs-1 offset-md-0 col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Dank</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Fresh</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;Subbed</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;Random</span></span>
      <span class="header-item offset-xs-1 offset-md-0 col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;&nbsp;Profile</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">Messages</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;&nbsp;Search</span></span>
      <span class="header-item col-xs-2 col-md-1">
        <span class="header-label">&nbsp;&nbsp;&nbsp;&nbsp;Help</span></span>
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

  private scrollToTop() {
    $("html, body").animate({scrollTop: 0}, "slow");
  }

}
