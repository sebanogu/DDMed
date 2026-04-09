import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BindingsSandboxComponent } from './bindings-sandbox.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('BindingsSandboxComponent', () => {
  let component: BindingsSandboxComponent;
  let fixture: ComponentFixture<BindingsSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BindingsSandboxComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(BindingsSandboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
