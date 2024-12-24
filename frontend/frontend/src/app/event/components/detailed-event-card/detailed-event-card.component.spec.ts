import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedEventCardComponent } from './detailed-event-card.component';

describe('DetailedEventCardComponent', () => {
  let component: DetailedEventCardComponent;
  let fixture: ComponentFixture<DetailedEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedEventCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
