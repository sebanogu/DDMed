import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadQuestionnaireModalComponent } from './load-questionnaire-modal.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('LoadQuestionnaireModalComponent', () => {
  let component: LoadQuestionnaireModalComponent;
  let fixture: ComponentFixture<LoadQuestionnaireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadQuestionnaireModalComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(LoadQuestionnaireModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
