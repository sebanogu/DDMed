import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaturityMainComponent } from './maturity-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('MaturityMainComponent', () => {
  let component: MaturityMainComponent;
  let fixture: ComponentFixture<MaturityMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaturityMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(MaturityMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
