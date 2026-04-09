import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnairesMainComponent } from './questionnaires-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('QuestionnairesMainComponent', () => {
  let component: QuestionnairesMainComponent;
  let fixture: ComponentFixture<QuestionnairesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionnairesMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionnairesMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
