import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        data: { animation: 'WelcomePage' },
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, anchorScrolling: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
