import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerCardComponent } from './learner-card.component';

describe('LearnerCardComponent', () => {
  let component: LearnerCardComponent;
  let fixture: ComponentFixture<LearnerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
