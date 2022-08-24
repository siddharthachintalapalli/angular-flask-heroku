import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterCountryDistComponent } from './cluster-country-dist.component';

describe('ClusterCountryDistComponent', () => {
  let component: ClusterCountryDistComponent;
  let fixture: ComponentFixture<ClusterCountryDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterCountryDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterCountryDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
