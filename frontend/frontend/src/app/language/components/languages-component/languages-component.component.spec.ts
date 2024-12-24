import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesComponentComponent } from './languages-component.component';

describe('LanguagesComponentComponent', () => {
  let component: LanguagesComponentComponent;
  let fixture: ComponentFixture<LanguagesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
