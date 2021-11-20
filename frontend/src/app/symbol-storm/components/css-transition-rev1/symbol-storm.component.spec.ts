import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolStormCssComponent } from './symbol-storm.component';

describe('SymbolStormComponent', () => {
  let component: SymbolStormCssComponent;
  let fixture: ComponentFixture<SymbolStormCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolStormCssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolStormCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
