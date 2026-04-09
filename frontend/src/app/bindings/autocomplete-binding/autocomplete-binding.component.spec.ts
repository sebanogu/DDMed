import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteBindingComponent } from './autocomplete-binding.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('AutocompleteBindingComponent', () => {
  let component: AutocompleteBindingComponent;
  let fixture: ComponentFixture<AutocompleteBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteBindingComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteBindingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
