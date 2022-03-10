import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpacesComponent } from './work-spaces.component';

describe('WorkSpacesComponent', () => {
  let component: WorkSpacesComponent;
  let fixture: ComponentFixture<WorkSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkSpacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
