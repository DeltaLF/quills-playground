import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPlaygroundComponent } from './token-playground.component';

describe('TokenPlaygroundComponent', () => {
  let component: TokenPlaygroundComponent;
  let fixture: ComponentFixture<TokenPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
