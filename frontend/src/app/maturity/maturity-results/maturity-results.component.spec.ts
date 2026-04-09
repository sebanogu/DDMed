import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaturityResultsComponent } from './maturity-results.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('MaturityResultsComponent', () => {
  let component: MaturityResultsComponent;
  let fixture: ComponentFixture<MaturityResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaturityResultsComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(MaturityResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
