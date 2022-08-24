import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterGenderDistComponent } from './cluster-gender-dist.component';

describe('ClusterGenderDistComponent', () => {
  let component: ClusterGenderDistComponent;
  let fixture: ComponentFixture<ClusterGenderDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterGenderDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterGenderDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
