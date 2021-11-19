import { NgModule } from '@angular/core';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: WelcomePageComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class WelcomeRoutingModule { }
