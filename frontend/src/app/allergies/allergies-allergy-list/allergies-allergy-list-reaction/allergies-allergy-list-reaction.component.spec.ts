import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllergiesAllergyListReactionComponent } from './allergies-allergy-list-reaction.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('AllergiesAllergyListReactionComponent', () => {
  let component: AllergiesAllergyListReactionComponent;
  let fixture: ComponentFixture<AllergiesAllergyListReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllergiesAllergyListReactionComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(AllergiesAllergyListReactionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
