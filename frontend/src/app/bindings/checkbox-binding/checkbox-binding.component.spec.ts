import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckBoxBindingComponent } from './checkbox-binding.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('CheckBoxBindingComponent', () => {
  let component: CheckBoxBindingComponent;
  let fixture: ComponentFixture<CheckBoxBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckBoxBindingComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBoxBindingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
