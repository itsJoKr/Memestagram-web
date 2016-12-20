import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {LoginType, ThisUser} from "../models/ThisUser";

@Injectable()
export class AuthService {
  private user:ThisUser;


  constructor(private af: AngularFire) {
  }

  public authObservable() {
    return this.af.auth;
  }

  public loginUser(uid: string, name: string, type: LoginType) {
    this.user = new ThisUser(name, uid, type);
  }

  public logout() {
    this.af.auth.logout();
  }

  public ping() {
    // this.af.auth.subscribe(u => console.log(u));
    console.log(this.af.auth.getAuth());
  }

}
