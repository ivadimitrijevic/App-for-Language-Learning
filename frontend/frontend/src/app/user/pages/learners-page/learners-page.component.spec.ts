import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnersPageComponent } from './learners-page.component';

describe('LearnersPageComponent', () => {
  let component: LearnersPageComponent;
  let fixture: ComponentFixture<LearnersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
