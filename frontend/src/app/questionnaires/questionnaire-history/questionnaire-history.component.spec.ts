import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireHistoryComponent } from './questionnaire-history.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('QuestionnaireHistoryComponent', () => {
  let component: QuestionnaireHistoryComponent;
  let fixture: ComponentFixture<QuestionnaireHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnaireHistoryComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnaireHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
