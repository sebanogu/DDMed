import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaturityDashboardComponent } from './maturity-dashboard.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('MaturityDashboardComponent', () => {
  let component: MaturityDashboardComponent;
  let fixture: ComponentFixture<MaturityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaturityDashboardComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(MaturityDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
