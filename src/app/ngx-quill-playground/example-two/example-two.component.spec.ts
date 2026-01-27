import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTwoComponent } from './example-two.component';

describe('ExampleTwoComponent', () => {
  let component: ExampleTwoComponent;
  let fixture: ComponentFixture<ExampleTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
