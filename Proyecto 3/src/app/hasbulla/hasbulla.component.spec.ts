import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasbullaComponent } from './hasbulla.component';

describe('HasbullaComponent', () => {
  let component: HasbullaComponent;
  let fixture: ComponentFixture<HasbullaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HasbullaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HasbullaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
