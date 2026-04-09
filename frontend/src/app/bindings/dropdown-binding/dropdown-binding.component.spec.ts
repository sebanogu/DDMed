import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownBindingComponent } from './dropdown-binding.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('DropdownBindingComponent', () => {
  let component: DropdownBindingComponent;
  let fixture: ComponentFixture<DropdownBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownBindingComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownBindingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
