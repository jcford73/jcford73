import {
    animate,
    animateChild,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('routeAnimations', [
            transition('WelcomePage => *', [
                query(':enter', [
                    style({
                        opacity: 0,
                    }),
                ]),
                query(':leave', [
                    style({
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'transparent',
                        zIndex: 1
                    }),
                ]),
                group([
                    query(':enter', [
                        animate('500ms ease-out', style({ opacity: 1 })),
                    ]),
                    query(':leave', [
                        animate('500ms ease-out', style({ bottom: '-100%' })),
                    ]),
                ]),
            ]),
        ]),
    ],
})
export class AppComponent {
    prepareRoute(outlet: RouterOutlet) {
        return outlet?.activatedRouteData?.['animation'];
    }
}
