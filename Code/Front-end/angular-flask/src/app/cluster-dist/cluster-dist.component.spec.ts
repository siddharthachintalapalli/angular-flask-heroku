import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDistComponent } from './cluster-dist.component';

describe('ClusterDistComponent', () => {
  let component: ClusterDistComponent;
  let fixture: ComponentFixture<ClusterDistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterDistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
