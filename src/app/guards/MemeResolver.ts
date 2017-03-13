import {Injectable}             from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Meme} from "../models/Meme";
import {Observable, Subject} from "rxjs";
import {MemeService} from "../services/MemeService";

@Injectable()
export class MemeResolver implements Resolve<Meme> {
  constructor(private router: Router, private ms: MemeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let memeUid = route.params["uid"];

    return this.ms.getMeme(memeUid).map(meme => {
      if (meme!=null) {
        return meme;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    }).first();
  }

}
