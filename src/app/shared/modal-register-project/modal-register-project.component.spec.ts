import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegisterProjectComponent } from './modal-register-project.component';

describe('ModalRegisterProjectComponent', () => {
  let component: ModalRegisterProjectComponent;
  let fixture: ComponentFixture<ModalRegisterProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegisterProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegisterProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
