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
import {LoginPage} from "./route-components/LoginPage";
import {AngularFireModule, AuthProviders, AuthMethods} from "angularfire2";
import {MemeService} from "./services/MemeService";
import {MaterialModule} from "@angular/material";
import {AuthService} from "./services/AuthService";
import {AuthGuard} from "./guards/AuthGuard";

const firebaseConfig = {
  apiKey: "AIzaSyAjKU0fqwBzsBGWPL6-_fhLWm1U2DaZQ_k",
  authDomain: "web-quickstart-1bd39.firebaseapp.com",
  databaseURL: "https://web-quickstart-1bd39.firebaseio.com",
  storageBucket: "web-quickstart-1bd39.appspot.com",
  messagingSenderId: "661525560495"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    Root, Header, MemesList, ScrollSpyAffixDirective, NotFoundPage,
    MemeCard, MemeCardDescription, MessagesPage, ProfilePage, SearchPage, HelpPage, LoginPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    [MaterialModule.forRoot()],
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ScrollSpyModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'memes/dank', pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'login', component: LoginPage},
      {path: 'memes/:type', component: MemesList, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfilePage, canActivate: [AuthGuard]},
      {path: 'messages', component: MessagesPage, canActivate: [AuthGuard]},
      {path: 'search', component: SearchPage, canActivate: [AuthGuard]},
      {path: 'help', component: HelpPage},
      {path: '**', component: NotFoundPage},
    ])
  ],
  providers: [MemeService, AuthService, AuthGuard],
  bootstrap: [Root]
})
export class AppModule { }
