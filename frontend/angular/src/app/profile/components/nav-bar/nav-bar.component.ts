import { Component } from '@angular/core';
import * as faBrands from '@fortawesome/free-brands-svg-icons';
import * as faSolid from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  fa = { ...faBrands, ...faSolid };

  constructor() { }

}
