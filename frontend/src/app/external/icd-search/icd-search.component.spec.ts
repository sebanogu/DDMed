import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IcdSearchComponent } from './icd-search.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('IcdSearchComponent', () => {
  let component: IcdSearchComponent;
  let fixture: ComponentFixture<IcdSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcdSearchComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(IcdSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
