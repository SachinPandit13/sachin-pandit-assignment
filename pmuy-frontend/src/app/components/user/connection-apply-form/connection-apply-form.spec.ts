import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionApplyForm } from './connection-apply-form';

describe('ConnectionApplyForm', () => {
  let component: ConnectionApplyForm;
  let fixture: ComponentFixture<ConnectionApplyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionApplyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionApplyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
