import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Meme} from "../models/Meme";

@Injectable()
export class MemeService {

  constructor(private af: AngularFire) {

  }

  public getMemes(): FirebaseListObservable<Meme[]> {
    return this.af.database.list('/memes')
  }

  public getDankMemes(): FirebaseListObservable<Meme[]> {
    return this.af.database.list('/memes', { query: {
      orderByChild: 'upvotes'
    }})
  }
}
