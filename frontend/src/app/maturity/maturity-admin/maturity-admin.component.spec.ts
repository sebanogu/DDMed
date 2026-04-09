import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaturityAdminComponent } from './maturity-admin.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('MaturityAdminComponent', () => {
  let component: MaturityAdminComponent;
  let fixture: ComponentFixture<MaturityAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaturityAdminComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(MaturityAdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
