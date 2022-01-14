import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSwapperComponent } from './organization-swapper.component';

describe('OrganizationSwapperComponent', () => {
  let component: OrganizationSwapperComponent;
  let fixture: ComponentFixture<OrganizationSwapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSwapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSwapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
