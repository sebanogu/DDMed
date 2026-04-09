import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubsetValidatorComponent } from './subset-validator.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('SubsetValidatorComponent', () => {
  let component: SubsetValidatorComponent;
  let fixture: ComponentFixture<SubsetValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubsetValidatorComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(SubsetValidatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
