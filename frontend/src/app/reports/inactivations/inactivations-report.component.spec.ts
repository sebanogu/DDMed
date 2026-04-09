import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InactivationsReportComponent } from './inactivations-report.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('InactivationsReportComponent', () => {
  let component: InactivationsReportComponent;
  let fixture: ComponentFixture<InactivationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactivationsReportComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(InactivationsReportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
