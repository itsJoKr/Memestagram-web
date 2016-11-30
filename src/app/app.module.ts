import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';
import {ScrollSpyAffixDirective} from "ng2-scrollspy/src/plugin/affix.directive"
import {ScrollSpyModule} from 'ng2-scrollspy';

import { Root } from './root';
import {Header} from './components/header';
import {List} from "./components/test_list";

@NgModule({
  declarations: [
    Root, Header, List, ScrollSpyAffixDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScrollSpyModule.forRoot(),
    RouterModule.forRoot([
      {path: '**', component: List},
      {path: 'list/:id', component: List},
    ])
  ],
  providers: [],
  bootstrap: [Root]
})
export class AppModule { }
