import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticReportFormComponent } from './diagnostic-report-form.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('DiagnosticReportFormComponent', () => {
  let component: DiagnosticReportFormComponent;
  let fixture: ComponentFixture<DiagnosticReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagnosticReportFormComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticReportFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
