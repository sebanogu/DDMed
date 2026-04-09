import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoincMainComponent } from './loinc-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('LoincMainComponent', () => {
  let component: LoincMainComponent;
  let fixture: ComponentFixture<LoincMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoincMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(LoincMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
