import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedProjectModalComponent } from './posted-project-modal.component';

describe('PostedProjectModalComponent', () => {
  let component: PostedProjectModalComponent;
  let fixture: ComponentFixture<PostedProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedProjectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
