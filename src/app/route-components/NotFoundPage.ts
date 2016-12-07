/**
 * Created by jokr on 01.12.16.
 */
import {Component} from '@angular/core';
@Component({
  selector: 'not-found',
  template: `
    <div class="card">
          <img class="header-image"  src="/assets/images/logo-e.svg" />
          <div class="center-me"><h2>Ooops, 404 again. The page you are looking for can't be found.</h2></div>
          <div class="center-me">"Nemoj ići lijevo na križanju staze" <i>Thompson</i></div>
    </div>`
})
export class NotFoundPage {
}
