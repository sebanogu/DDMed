import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRootModuleComponent } from './create-root-module.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('CreateRootModuleComponent', () => {
  let component: CreateRootModuleComponent;
  let fixture: ComponentFixture<CreateRootModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRootModuleComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRootModuleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
