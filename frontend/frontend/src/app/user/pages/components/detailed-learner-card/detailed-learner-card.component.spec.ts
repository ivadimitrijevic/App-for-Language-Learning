import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedLearnerCardComponent } from './detailed-learner-card.component';

describe('DetailedLearnerCardComponent', () => {
  let component: DetailedLearnerCardComponent;
  let fixture: ComponentFixture<DetailedLearnerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedLearnerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedLearnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
