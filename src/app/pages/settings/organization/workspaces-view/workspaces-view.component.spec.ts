import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacesViewComponent } from './workspaces-view.component';

describe('WorkspacesViewComponent', () => {
  let component: WorkspacesViewComponent;
  let fixture: ComponentFixture<WorkspacesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
