import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
    welcomeExpanded = false;
    constructor() {}
    expandWelcome($event: MouseEvent): void {
        this.welcomeExpanded = true;
        $event.preventDefault();
    }
}
