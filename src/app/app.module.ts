import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule}   from '@angular/router';
import {ScrollSpyAffixDirective} from "ng2-scrollspy/src/plugin/affix.directive"
import {ScrollSpyModule} from 'ng2-scrollspy';

import { Root } from './root';
import {Header} from './components/Header';
import {MemesList} from "./route-components/MemesList";
import {NotFoundPage} from "./route-components/NotFoundPage";
import {MemeCard} from "./components/MemeCard";
import {MemeCardDescription} from "./components/MemeCardDescription";
import {ProfilePage} from "./route-components/ProfilePage";
import {MessagesPage} from "./route-components/MessagesPage";
import {SearchPage} from "./route-components/SearchPage";
import {HelpPage} from "./route-components/HelpPage";

@NgModule({
  declarations: [
    Root, Header, MemesList, ScrollSpyAffixDirective, NotFoundPage,
    MemeCard, MemeCardDescription, MessagesPage, ProfilePage, SearchPage, HelpPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScrollSpyModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'memes/dank', pathMatch: 'full'},
      {path: 'memes/:type', component: MemesList},
      {path: 'profile', component: ProfilePage},
      {path: 'messages', component: MessagesPage},
      {path: 'search', component: SearchPage},
      {path: 'help', component: HelpPage},
      {path: '**', component: NotFoundPage},
    ])
  ],
  providers: [],
  bootstrap: [Root]
})
export class AppModule { }
