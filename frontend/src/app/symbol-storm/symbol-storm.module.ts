import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SymbolStormNgComponent } from './components/angular-transition-rev1/symbol-storm.component';
import { SymbolStormCssComponent } from './components/css-transition-rev1/symbol-storm.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SymbolStormNgComponent, SymbolStormCssComponent ],
    exports: [SymbolStormNgComponent, SymbolStormCssComponent],
})
export class SymbolStormModule {}
