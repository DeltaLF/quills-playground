import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillsPlaygroundComponent } from './quills-playground.component';

describe('QuillsPlaygroundComponent', () => {
  let component: QuillsPlaygroundComponent;
  let fixture: ComponentFixture<QuillsPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillsPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillsPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
