import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllergiesProblemListComponent } from './allergies-problem-list.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('AllergiesProblemListComponent', () => {
  let component: AllergiesProblemListComponent;
  let fixture: ComponentFixture<AllergiesProblemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllergiesProblemListComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(AllergiesProblemListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
