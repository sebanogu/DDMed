import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EhdsLaboratoryDemoComponent } from './ehds-laboratory-demo.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('EhdsLaboratoryDemoComponent', () => {
  let component: EhdsLaboratoryDemoComponent;
  let fixture: ComponentFixture<EhdsLaboratoryDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EhdsLaboratoryDemoComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(EhdsLaboratoryDemoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
