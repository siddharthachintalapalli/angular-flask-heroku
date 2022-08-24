import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDistComponent } from './country-dist.component';

describe('CountryDistComponent', () => {
  let component: CountryDistComponent;
  let fixture: ComponentFixture<CountryDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
