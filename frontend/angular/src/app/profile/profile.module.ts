import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SymbolStormModule } from '../symbol-storm/symbol-storm.module';



@NgModule({
  declarations: [
    ProfilePageComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    SymbolStormModule
  ]
})
export class ProfileModule { }
