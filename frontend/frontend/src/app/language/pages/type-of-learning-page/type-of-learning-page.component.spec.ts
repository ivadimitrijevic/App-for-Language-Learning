import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfLearningPageComponent } from './type-of-learning-page.component';

describe('TypeOfLearningPageComponent', () => {
  let component: TypeOfLearningPageComponent;
  let fixture: ComponentFixture<TypeOfLearningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfLearningPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfLearningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
