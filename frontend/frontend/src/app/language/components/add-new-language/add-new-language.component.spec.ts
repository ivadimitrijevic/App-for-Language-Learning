import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLanguageComponent } from './add-new-language.component';

describe('AddNewLanguageComponent', () => {
  let component: AddNewLanguageComponent;
  let fixture: ComponentFixture<AddNewLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
