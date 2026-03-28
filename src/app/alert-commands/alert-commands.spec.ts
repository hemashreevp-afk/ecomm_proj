import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCommands } from './alert-commands';

describe('AlertCommands', () => {
  let component: AlertCommands;
  let fixture: ComponentFixture<AlertCommands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCommands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertCommands);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
