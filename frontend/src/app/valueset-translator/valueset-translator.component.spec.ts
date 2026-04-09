import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValuesetTranslatorComponent } from './valueset-translator.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('ValuesetTranslatorComponent', () => {
  let component: ValuesetTranslatorComponent;
  let fixture: ComponentFixture<ValuesetTranslatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValuesetTranslatorComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(ValuesetTranslatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
