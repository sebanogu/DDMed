import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FhirServerSettingsModalComponent } from './fhir-server-settings-modal.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('FhirServerSettingsModalComponent', () => {
  let component: FhirServerSettingsModalComponent;
  let fixture: ComponentFixture<FhirServerSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhirServerSettingsModalComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(FhirServerSettingsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
