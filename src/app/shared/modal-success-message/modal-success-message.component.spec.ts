import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSuccessMessageComponent } from './modal-success-message.component';

describe('ModalSuccessMessageComponent', () => {
  let component: ModalSuccessMessageComponent;
  let fixture: ComponentFixture<ModalSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSuccessMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
