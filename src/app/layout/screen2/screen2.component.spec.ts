import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Screen2Component } from './screen2.component';

describe('Screen2Component', () => {
  let component: Screen2Component;
  let fixture: ComponentFixture<Screen2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Screen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Screen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
