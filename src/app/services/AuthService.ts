import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {LoginType, ThisUser} from "../models/ThisUser";
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";
import {error} from "util";

@Injectable()
export class AuthService {
  private user:ThisUser;
  private loginUserObservable = new Subject<ThisUser>();
  private userObservable = new Subject<ThisUser>();


  constructor(private af: AngularFire, private router: Router) {
  }

  public getUserPromise(): Promise<ThisUser> {
    let p = Promise.resolve({
      then: (onFulfill, onReject) => {
        if (this.user == null) {
          this.af.auth.subscribe(u => {
            if (u == null) {
              console.log("Not logged in");
              return;
            }

            this.af.database.object('/users/' + u.uid).subscribe(
              value=> {this.user = value;
                console.log(this.user);
                onFulfill(this.user);},
              error=> {throw new Error(error)})
          })
        } else {
          onFulfill(this.user);
        }
      }
    });

    return p;
  }

  public getUserObservable(): Observable<ThisUser> {
    return this.loginUserObservable.asObservable();
  }

  public authObservable() {
    return this.af.auth;
  }

  public loginAsNew(userPromise: Promise<any>, name: string, type: LoginType) {
    userPromise.then(u=> {
      console.log('userPromsie', u);
      this.user = new ThisUser(name, u.uid, type);
      this.loginUserObservable.next(this.user);
      console.log('uid: ', u.uid);
      let userRef = this.af.database.object('/users/' + u.uid);
      userRef.update({"username": name, "type": type}).then(_ => this.router.navigate(['/']));
      this.router.navigate(['./memes/dank']);
    });
  }

  public loginWithGoogle(userPromise: Promise<any>, name: string) {
    this.loginAsNew(userPromise, name, LoginType.Google);
  }

  public logout() {
    this.af.auth.logout();
  }

}
