import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBlockComponent } from './schedule-block.component';

describe('ScheduleBlockComponent', () => {
  let component: ScheduleBlockComponent;
  let fixture: ComponentFixture<ScheduleBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
