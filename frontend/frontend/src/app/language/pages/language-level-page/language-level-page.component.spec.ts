import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageLevelPageComponent } from './language-level-page.component';

describe('LanguageLevelPageComponent', () => {
  let component: LanguageLevelPageComponent;
  let fixture: ComponentFixture<LanguageLevelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageLevelPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageLevelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
