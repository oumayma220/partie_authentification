import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetCodeComponent } from './request-reset-code.component';

describe('RequestResetCodeComponent', () => {
  let component: RequestResetCodeComponent;
  let fixture: ComponentFixture<RequestResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestResetCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
