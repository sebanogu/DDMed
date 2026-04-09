import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewConceptsReportComponent } from './new-concepts-report.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('NewConceptsReportComponent', () => {
  let component: NewConceptsReportComponent;
  let fixture: ComponentFixture<NewConceptsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewConceptsReportComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(NewConceptsReportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
