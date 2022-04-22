import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTabComponent } from './users-tab.component';

describe('UsersTabComponent', () => {
  let component: UsersTabComponent;
  let fixture: ComponentFixture<UsersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
