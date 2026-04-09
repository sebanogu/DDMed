import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListQuestionnairesComponent } from './list-questionnaires.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('ListQuestionnairesComponent', () => {
  let component: ListQuestionnairesComponent;
  let fixture: ComponentFixture<ListQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListQuestionnairesComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(ListQuestionnairesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
