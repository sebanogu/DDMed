import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoincResultsComponent } from './loinc-results.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('LoincResultsComponent', () => {
  let component: LoincResultsComponent;
  let fixture: ComponentFixture<LoincResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoincResultsComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(LoincResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
