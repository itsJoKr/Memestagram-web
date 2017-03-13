import {Injectable}             from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Meme} from "../models/Meme";
import {Observable, Subject} from "rxjs";
import {MemeService} from "../services/MemeService";
import {SocialService} from "../services/SocialService";

@Injectable()
export class UserResolver implements Resolve<Meme> {
  constructor(private router: Router, private ss: SocialService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let userId = route.params["uid"];

    return this.ss.getUser(userId).map(user=> {
      if (user != null) {
        return user;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    }).first();
  }

}
