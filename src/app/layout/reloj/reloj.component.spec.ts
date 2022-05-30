import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelojComponent } from './reloj.component';

describe('RelojComponent', () => {
  let component: RelojComponent;
  let fixture: ComponentFixture<RelojComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
