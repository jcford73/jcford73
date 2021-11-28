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
import { Component, HostBinding, OnInit } from '@angular/core';

interface Symbol {
    text?: string;
    class: string;
    value?: 'shown' | 'hidden';
    params?: any;
}

@Component({
    selector: 'app-symbol-storm-ng',
    templateUrl: './symbol-storm.component.html',
    styleUrls: ['./symbol-storm.component.scss'],
    animations: [
        trigger('symbolStorm', [
            transition('void => shown, * => shown', [
                style({
                    opacity: 1,
                    fontSize: `{{fontSize}}rem`,
                    transform: `translate({{x}}vw) translateX(-{{o}}%) translateY({{y}}vh) rotate({{r}}deg)`,
                }),
                group([
                    animate(
                        '{{duration}}s cubic-bezier(1,.85,1,.85)',
                        style({
                            transform: `translate({{dx}}vw) translateX(-{{o}}%) translateY({{dy}}vh) rotate({{dr}}deg)`,
                        })
                    ),
                    animate(
                        '{{duration}}s linear',
                        keyframes([
                            style({ opacity: 0, offset: 0 }),
                            style({ opacity: 1, offset: .05 }),
                            style({ opacity: 1, offset: .95 }),
                            style({ opacity: 0, offset: 1 }),
                        ])
                    ),
                ]),
            ]),
        ]),
    ],
})
export class SymbolStormNgComponent implements OnInit {
    symbols!: Symbol[];
    private readonly maxSymbols = 35;
    private readonly columns = 2;

    get activeSymbols(): Symbol[] {
        return this.symbols.filter((s) => s.value === 'shown');
    }

    @HostBinding('attr.aria-hidden') ariaHidden = true;

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
            // { class: 'fab fa-angular' },
            // { class: 'fab fa-node' },
            // { class: 'fab fa-node-js' },
            // { class: 'fab fa-github' },
            // { class: 'fab fa-js-square' },
            // { class: 'fab fa-aws' },
            // { class: 'fas fa-code' },
            // { class: 'fab fa-react' },
        ];
        this.symbols = this.symbols.map((s) => this.resetSymbol(s));
        setInterval(() => this.updateStorm(), 500);
    }

    async updateStorm() {
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
        const column = Math.round(Math.random() * (this.columns - 1));
        const x = (Math.random() * 100) / this.columns;
        return {
            ...symbol,
            params: {
                x: x + (column * 100) / this.columns,
                o: x * this.columns,
                y: Math.pow(Math.random() * 30, 1 / 1.05) - 20,
                r: Math.random() * 40 - 20,
            },
            value: 'hidden',
        };
    }

    activateSymbol(symbol: Symbol): Symbol {
        const dx = symbol.params.x + (Math.random() * 5 + 2) * (Math.random() < 0.5 ? -1 : 1);
        const dy = 105;
        const dr = Math.random() * 40 - 20;
        const duration = Math.random() * 2 + (8 * (dy - symbol.params.y)) / dy;
        const fontSize = Math.random() * 2 + 2;
        return {
            ...symbol,
            params: {
                ...symbol.params,
                dx,
                dy,
                dr,
                duration,
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
