import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderDistComponent } from './gender-dist.component';

describe('GenderDistComponent', () => {
  let component: GenderDistComponent;
  let fixture: ComponentFixture<GenderDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
