import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaturityEditorComponent } from './maturity-editor.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('MaturityEditorComponent', () => {
  let component: MaturityEditorComponent;
  let fixture: ComponentFixture<MaturityEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaturityEditorComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(MaturityEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
