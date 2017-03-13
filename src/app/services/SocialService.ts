import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Meme} from "../models/Meme";
import {Comment} from "../models/Comment";
import {ThisUser} from "../models/ThisUser";
import {Convo} from "../models/Convo";

@Injectable()
export class SocialService {

  constructor(private af: AngularFire) {

  }

  public getUser(key: string): FirebaseObjectObservable<ThisUser> {
    return this.af.database.object('/users/' + key);
  }

  public getConvos(key: string): FirebaseListObservable<Convo[]> {
    return this.af.database.list('/users/' + key + '/convos/');
  }

  public getUserMemes(key: string): FirebaseListObservable<Meme[]> {
    return this.af.database.list('/memes/', {query: {
      orderByChild: 'user/key', equalTo: key
    }});
  }

}
