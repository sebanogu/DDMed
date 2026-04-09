import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipCardComponent } from './flip-card.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('FlipCardComponent', () => {
  let component: FlipCardComponent;
  let fixture: ComponentFixture<FlipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlipCardComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(FlipCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
