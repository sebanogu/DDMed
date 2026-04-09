import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckBoxMultipleBindingComponent } from './checkbox-multiple-binding.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('CheckBoxMultipleBindingComponent', () => {
  let component: CheckBoxMultipleBindingComponent;
  let fixture: ComponentFixture<CheckBoxMultipleBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckBoxMultipleBindingComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(CheckBoxMultipleBindingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
