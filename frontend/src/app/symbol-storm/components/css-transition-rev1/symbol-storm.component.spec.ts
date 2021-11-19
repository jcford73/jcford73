import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolStormComponent } from './symbol-storm.component';

describe('SymbolStormComponent', () => {
  let component: SymbolStormComponent;
  let fixture: ComponentFixture<SymbolStormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolStormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolStormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
