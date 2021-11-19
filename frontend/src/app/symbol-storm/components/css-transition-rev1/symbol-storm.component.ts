import { Component, OnInit } from '@angular/core';

interface Symbol {
    text?: string;
    class: string;
    shown?: boolean;
    props?: any;
    outerStyle?: any;
    innerStyle?: any;
}

@Component({
    selector: 'app-symbol-storm',
    templateUrl: './symbol-storm.component.html',
    styleUrls: ['./symbol-storm.component.scss'],
})
export class SymbolStormComponent implements OnInit {
    symbols!: Symbol[];
    get activeSymbols(): number {
        return this.symbols.filter((s) => s.shown).length;
    }
    private readonly maxSymbols = 10;
    private lastSymbol = 0;

    constructor() {}

    ngOnInit(): void {
        this.symbols = [
            // { class: 'plain', text: '@' },
            // { class: 'plain', text: '$' },
            // ...Array.from('!@#$%^&*()+=<>;:\'"[]{}|\\/').map((s) => ({
            //     text: s,
            //     class: 'plain',
            // })),
            // { text: '!', class: 'plain' },
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
        // console.log(`starting storm with ${this.maxSymbols} symbols`);
        this.symbols.forEach(this.resetSymbol);
        setInterval(() => this.startStorm(), 50);
    }

    async startStorm() {
        if (this.symbols.filter((s) => s.shown).length < this.maxSymbols) {
            const idleSymbols = this.symbols.filter((s) => !s.shown);
            if (idleSymbols.length > 0) {
                const index = Math.floor(Math.random() * idleSymbols.length);
                // console.log(index, idleSymbols, this.symbols.length);
                this.addSymbol(idleSymbols[index]);
            }
        } else {
            // console.log(`too many symbols: ${this.symbols.filter((s) => !!s.shown).length}`);
        }
    }

    resetSymbol(symbol: Symbol): void {
        if (!symbol.props) {
            symbol.props = {
                x: Math.random() * 100 - 10,
                y: Math.random() * 80 - 20,
                r: Math.random() * 40 - 20,
            };
        } else {
            symbol.props.x = Math.random() * 100 - 10;
            symbol.props.y = -20;
            symbol.props.r = Math.random() * 40 - 20;
        }
        symbol.outerStyle = {
            transform: `translate(${symbol.props.x}vw, ${symbol.props.y}vh) rotate(${symbol.props.r}deg)`,
        };
        symbol.innerStyle = {
            opacity: 0,
        };
        setTimeout(() => (symbol.shown = false), 1);
    }

    addSymbol(symbol: Symbol): void {
        // console.log(`Add Symbol ${symbol.text || symbol.class}`)
        symbol.props.dx =
            symbol.props.x + //
            (Math.random() * 5 + 2) * (Math.random() < 0.5 ? -1 : 1);
        symbol.props.dy = 90;
        symbol.props.dr = Math.random() * 40 - 20;
        symbol.props.inSeconds = Math.random() * 0.25 + 0.25;
        symbol.props.delaySeconds = Math.random() * 6 + 4;
        symbol.props.outSeconds = Math.random() * 0.25 + 0.25;
        symbol.props.fullSeconds =
            symbol.props.inSeconds + //
            symbol.props.delaySeconds +
            symbol.props.outSeconds;
        symbol.props.fontSize = Math.random() * 5 + 5;
        symbol.outerStyle = {
            opacity: 1,
            transform: `translate(${symbol.props.dx}vw, ${symbol.props.dy}vh) rotate(${symbol.props.dr}deg)`,
            transition: `transform ${symbol.props.fullSeconds}s linear`,
            fontSize: `${symbol.props.fontSize}rem`,
        };
        symbol.innerStyle = {
            opacity: 1,
            transition: `opacity ${symbol.props.inSeconds}s linear`,
        };
        symbol.shown = true;
        // setTimeout(() => {
        // }, (symbol.props.inSeconds + symbol.props.delaySeconds) * 1000);
        // setTimeout(() => this.remove(symbol), symbol.props.fullSeconds * 1000);
    }

    onTransitionEnd($event: TransitionEvent, symbol: Symbol) {
        if ($event.propertyName === 'transform') {
            // console.log(`Removing symbol ${JSON.stringify(symbol)}`);
            this.resetSymbol(symbol);
        } else if (symbol.innerStyle.opacity === 1) {
            symbol.innerStyle = {
                opacity: 0,
                transition: `opacity ${symbol.props.outSeconds}s ${symbol.props.delaySeconds}s linear`,
            };
        }

        // delete symbol.style;
        // this.symbols = [
        //     ...this.symbols,
        //     {
        //         text: symbol.text,
        //         class: symbol.class,
        //     },
        // ];
        // console.log(this.symbols.length, this.symbols);
        // this.activeSymbols = this.activeSymbols.filter(
        //     (s) => (s.text || s.class) !== (symbol.text || symbol.class)
        // );
        // console.log(JSON.stringify(this.activeSymbols));
        // console.log(this.activeSymbols.length, this.activeSymbols);
    }
}
