import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageConfigComponent } from './language-config.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('LanguageConfigComponent', () => {
  let component: LanguageConfigComponent;
  let fixture: ComponentFixture<LanguageConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageConfigComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageConfigComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
