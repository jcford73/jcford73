import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, interval } from 'rxjs';

interface Letter {
    letter: string;
    shown: boolean;
}

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
    private lines = [
        'Hi there.', //
        `I'm JC.`,
        'This is my portfolio.',
    ];

    outputLines!: Array<{ letters: Array<Letter> }>;
    buttonVisible = false;

    constructor(private router: Router) {}

    // @HostListener('click')
    // hostClick(): void {
    //     // this.router.navigate(['profile']);
    // }

    async ngOnInit(): Promise<void> {
        this.outputLines = this.lines.map((line) => ({
            letters: Array.from(line).map((letter) => ({
                letter,
                shown: false,
            })),
        }));
        await this.typeOutput();
    }

    async typeOutput(): Promise<void> {
        for (const outputLine of this.outputLines) {
            for (const letter of outputLine.letters) {
                letter.shown = true;
                await firstValueFrom(interval(50));
            }
            await firstValueFrom(interval(500));
        }
        await firstValueFrom(interval(1000));
        this.buttonVisible = true;
    }
}
