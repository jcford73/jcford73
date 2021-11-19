import {
    animate,
    AnimationEvent,
    group,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

interface Symbol {
    text?: string;
    class: string;
    value?: 'shown' | 'hidden';
    params?: any;
}

@Component({
    selector: 'app-symbol-storm',
    templateUrl: './symbol-storm.component.html',
    styleUrls: ['./symbol-storm.component.scss'],
    animations: [
        trigger('symbolStorm', [
            state(
                'shown',
                style({
                    opacity: 0,
                    fontSize: `{{fontSize}}rem`,
                    transform: `translate({{dx}}vw, {{dy}}vh) rotate({{dr}}deg)`,
                }),
                {
                    params: {
                        dx: 0,
                        dy: 0,
                        dr: 0,
                        fontSize: 5,
                    },
                }
            ),
            transition('void => shown, * => shown', [
                style({
                    opacity: 0,
                    fontSize: `{{fontSize}}rem`,
                    transform: `translate({{x}}vw, {{y}}vh) rotate({{r}}deg)`,
                }),
                group([
                    animate(
                        '{{fullSeconds}}s',
                        style({ transform: `translate({{dx}}vw, {{dy}}vh) rotate({{dr}}deg)` })
                    ),
                    animate(
                        '{{fullSeconds}}s',
                        keyframes([
                            style({ opacity: 0 }),
                            style({ opacity: 1 }),
                            style({ opacity: 1 }),
                            style({ opacity: 1 }),
                            style({ opacity: 1 }),
                            style({ opacity: 0 }),
                        ])
                    ),
                ]),
            ]),
        ]),
    ],
})
export class SymbolStormComponent implements OnInit {
    symbols!: Symbol[];
    private readonly maxSymbols = 20;

    constructor() {}

    ngOnInit(): void {
        this.symbols = [
            // { class: 'plain', text: '@' },
            // { class: 'plain', text: '$' },
            // ...Array.from('!@#$%^&*()+=<>;:\'"[]{}|\\/').map((s) => ({
            //     text: s,
            //     class: 'plain',
            // })),
            { text: '!', class: 'plain' },
            { text: '!!', class: 'plain' },
            { text: '@', class: 'plain' },
            { text: '#', class: 'plain' },
            { text: '$', class: 'plain' },
            { text: '&', class: 'plain' },
            { text: '^', class: 'plain' },
            { text: '/^.*$/', class: 'plain' },
            { text: '', class: 'plain' },
            { text: '*', class: 'plain' },
            { text: '**/*', class: 'plain' },
            { text: '( )', class: 'plain' },
            { text: '+', class: 'plain' },
            { text: '+=', class: 'plain' },
            { text: '++', class: 'plain' },
            { text: '=', class: 'plain' },
            { text: '< >', class: 'plain' },
            { text: '<', class: 'plain' },
            { text: '>', class: 'plain' },
            { text: ';', class: 'plain' },
            { text: ':', class: 'plain' },
            { text: '::before', class: 'plain' },
            { text: '::after', class: 'plain' },
            { text: ':hover', class: 'plain' },
            { text: ':focus', class: 'plain' },
            { text: 'transform:', class: 'plain' },
            { text: 'transition:', class: 'plain' },
            { text: 'display: grid', class: 'plain' },
            { text: 'display: flex', class: 'plain' },
            { text: '${text}', class: 'plain' },
            { text: '[ ]', class: 'plain' },
            { text: '{ }', class: 'plain' },
            { text: '| |', class: 'plain' },
            { text: '&&', class: 'plain' },
            { text: '( ) => { }', class: 'plain' },
            { text: 'return;', class: 'plain' },
            { text: '@Component()', class: 'plain' },
            { text: '@Module()', class: 'plain' },
            { text: '@Injectable()', class: 'plain' },
            { text: 'class', class: 'plain' },
            { text: 'iife', class: 'plain' },
            { text: 'closure', class: 'plain' },
            { text: '.subscribe()', class: 'plain' },
            { text: 'firstValueFrom()', class: 'plain' },
            { text: '.pipe(map(...))', class: 'plain' },
            { text: 'assert', class: 'plain' },
            { text: 'expect()', class: 'plain' },
            { text: 'toBeTruthy()', class: 'plain' },
            { text: 'fixture', class: 'plain' },
            { text: 'TestBed', class: 'plain' },
            { text: 'createComponent()', class: 'plain' },
            { text: 'postgres', class: 'plain' },
            { text: 'NoSQL', class: 'plain' },
            { text: 'void', class: 'plain' },
            { text: 'font-awesome', class: 'plain' },
            { text: 'javascript', class: 'plain' },
            { class: 'fab fa-angular' },
            { class: 'fab fa-node' },
            { class: 'fab fa-node-js' },
            { class: 'fab fa-github' },
            { class: 'fab fa-js-square' },
            { class: 'fab fa-aws' },
            { class: 'fas fa-code' },
            { class: 'fab fa-react' },
        ];
        this.symbols = this.symbols.map((s) => this.resetSymbol(s));
        setInterval(() => this.startStorm(), 500);
    }

    async startStorm() {
        if (this.symbols.filter((s) => s.value === 'shown').length < this.maxSymbols) {
            const idleSymbols = this.symbols.filter((s) => s.value !== 'shown');
            if (idleSymbols.length > 0) {
                const index = Math.floor(Math.random() * idleSymbols.length);
                const symbol = idleSymbols[index];
                this.symbols = [
                    ...this.symbols.filter((s) => s !== symbol),
                    this.activateSymbol(idleSymbols[index]),
                ];
            }
        } else {
            // console.log(`too many symbols: ${this.symbols.filter((s) => !!s.shown).length}`);
        }
    }

    resetSymbol(symbol: Symbol): Symbol {
        let props: any;
        return {
            ...symbol,
            params: {
                x: Math.random() * 100 - 10,
                y: -20,
                r: Math.random() * 40 - 20,
            },
            value: 'hidden',
        };
    }

    activateSymbol(symbol: Symbol): Symbol {
        const dx = symbol.params.x + (Math.random() * 5 + 2) * (Math.random() < 0.5 ? -1 : 1);
        const dy = 100;
        const dr = Math.random() * 40 - 20;
        const inSeconds = Math.random() * 0.25 + 0.25;
        const delaySeconds = Math.random() * 1 + 9;
        const outSeconds = Math.random() * 0.25 + 0.25;
        const fullSeconds = inSeconds + delaySeconds + outSeconds;
        const fontSize = Math.random() * 5 + 5;
        return {
            ...symbol,
            params: {
                ...symbol.params,
                dx,
                dy,
                dr,
                inSeconds,
                showOffset: inSeconds / fullSeconds,
                fadeOffset: (inSeconds + delaySeconds) / fullSeconds,
                delaySeconds,
                outSeconds,
                fullSeconds,
                fontSize,
            },
            value: 'shown',
        };
    }

    fadeSymbol(symbol: Symbol): Symbol {
        return {
            ...symbol,
        };
    }

    onTransitionEnd($event: AnimationEvent, symbol: Symbol) {
        if ($event.toState === 'shown') {
            this.symbols = [
                ...this.symbols.filter((s) => s !== symbol), //
                this.resetSymbol(symbol),
            ];
        }
    }
}
