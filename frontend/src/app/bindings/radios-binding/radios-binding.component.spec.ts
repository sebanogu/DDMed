import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadiosBindingComponent } from './radios-binding.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('RadiosBindingComponent', () => {
  let component: RadiosBindingComponent;
  let fixture: ComponentFixture<RadiosBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadiosBindingComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(RadiosBindingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
