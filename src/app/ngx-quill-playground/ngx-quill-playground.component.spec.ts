import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQuillPlaygroundComponent } from './ngx-quill-playground.component';

describe('NgxQuillPlaygroundComponent', () => {
  let component: NgxQuillPlaygroundComponent;
  let fixture: ComponentFixture<NgxQuillPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxQuillPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxQuillPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
