import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoincOrderComponent } from './loinc-order.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('LoincOrderComponent', () => {
  let component: LoincOrderComponent;
  let fixture: ComponentFixture<LoincOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoincOrderComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(LoincOrderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
