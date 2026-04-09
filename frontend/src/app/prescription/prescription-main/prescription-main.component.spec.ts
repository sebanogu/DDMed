import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescriptionMainComponent } from './prescription-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('PrescriptionMainComponent', () => {
  let component: PrescriptionMainComponent;
  let fixture: ComponentFixture<PrescriptionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrescriptionMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(PrescriptionMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
