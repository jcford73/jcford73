import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolStormNgComponent } from './symbol-storm.component';

describe('SymbolStormComponent', () => {
  let component: SymbolStormNgComponent;
  let fixture: ComponentFixture<SymbolStormNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolStormNgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolStormNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
