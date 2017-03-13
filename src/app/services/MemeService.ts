import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Meme} from "../models/Meme";
import {Comment} from "../models/Comment";
import {Observable, Subject} from "rxjs";
import {count} from "rxjs/operator/count";

@Injectable()
export class MemeService {

  constructor(private af: AngularFire) {

  }

  public getMemes(): FirebaseListObservable<Meme[]> {
    return this.af.database.list('/memes')
  }

  public getDankMemes(): FirebaseListObservable<Meme[]> {
    return this.af.database.list('/memes', { query: {
      orderByChild: 'likes', limitToLast: 20
    }})
  }

  public getDankMemesObservable(): Observable<Meme[]> {
    return this.af.database.list('/memes', { query: {
      orderByChild: 'likes', limitToLast: 20
    }}).take(20).map(arr => arr.sort(function(x, y) {
      return (y.likes - x.likes);
    }));
  }

  public getFreshMemes(): Observable<Meme[]> {
    return this.af.database.list('/memes', { query: {
      orderByChild: 'timestamp', limitToLast: 20
    }}).take(20).map(arr => arr.sort(function (x, y) {
      return (y.timestamp - x.timestamp);
    }));
  }

  public getRandomMemes(): Observable<Meme[]> {
    let rmo: Subject<Meme[]> = new Subject();

    this.af.database.object('/misc/count')
      .take(1).subscribe(count => this.generateRandoms(rmo, count.$value));

    return rmo.asObservable();
  }

  public getMeme(uid: string): FirebaseObjectObservable<Meme> {
    return this.af.database.object('/memes/' + uid);
  }

  public getComments(memeUid: string): FirebaseListObservable<Comment[]> {
    return this.af.database.list('/comments/' + memeUid);
  }

  public postComment(comment: Comment, memeUid: string) {
    let comments = this.af.database.list('/comments/' + memeUid);
    comments.push(comment);
  }

  public toggleLike(userKey: string, meme: Meme) {
    let memeUid = meme.$key;

    let path = 'users/' + userKey + '/likes/' + memeUid;
    let isLiked = this.af.database.object(path)
      .take(1).subscribe(like => {
        if (like.$value == null) {
          console.log('null');
          this.af.database.object(path).set(memeUid);
          this.af.database.object('/memes/' + memeUid + '/likes').set(meme.likes + 1);
          meme.likes = meme.likes+1;
        } else {
          this.af.database.object(path).set(null);
          this.af.database.object('/memes/' + memeUid + '/likes').set(meme.likes - 1);
          meme.likes = meme.likes-1;
        }
      });
  }

  private generateRandoms(obs: Subject<Meme[]>, count: number) {
    let numOfMemes = count > 10 ? 10 : (count-2);
    let rands = this.fillWithRandoms(numOfMemes);

    this.af.database.list('/memekeys')
      .take(count).map(keys => {
          let randomKeys = [];

          for (let i=0; i<rands.length; i++) {
            randomKeys.push(keys[rands[i]].$value);
          }

          return randomKeys;
    }).subscribe(arrKeys => {
      // Hacky as hell: As Frank Van Puff said, Firebase will always return object in order
      // they were requested, so we use this trick to get array instead individual items
      let memes: Meme[] = [];
      let lastKey = arrKeys[arrKeys.length-1];

      for (let i=0; i<arrKeys.length; i++) {
        this.af.database.object('/memes/' + arrKeys[i])
          .subscribe(meme => {
            if (meme.$key != lastKey) {
              memes.push(meme);
            } else {
              memes.push(meme);
              obs.next(memes);
            }
          });
      }
    });
  }

  private fillWithRandoms(count: number): number[] {
    let rands: number[] = [];
    for (let i = 0; i < count; i++) rands[i] = 0;

    for (let i = 0; i < count; i++) {
      let notUnique: boolean;
      do {
        let randNum = this.rand(count);
        notUnique = false;

        for (let j = 0; j < count; j++) {
          if (rands[j] == randNum) {
            notUnique = true;
          }
        }

        if (!notUnique) rands[i] = randNum;
      } while (notUnique);
    }
    return rands;
  }

  private rand(bound: number) {
    return Math.floor((Math.random() * bound) + 1);
  }
}
