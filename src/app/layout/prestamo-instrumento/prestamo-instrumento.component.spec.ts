import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoInstrumentoComponent } from './prestamo-instrumento.component';

describe('PrestamoInstrumentoComponent', () => {
  let component: PrestamoInstrumentoComponent;
  let fixture: ComponentFixture<PrestamoInstrumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamoInstrumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoInstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
