import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadtasksComponent } from './readtasks.component';

describe('ReadtasksComponent', () => {
  let component: ReadtasksComponent;
  let fixture: ComponentFixture<ReadtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadtasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
