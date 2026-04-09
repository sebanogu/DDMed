import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateQuestionnaireComponent } from './validate-questionnaire.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('ValidateQuestionnaireComponent', () => {
  let component: ValidateQuestionnaireComponent;
  let fixture: ComponentFixture<ValidateQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateQuestionnaireComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateQuestionnaireComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
