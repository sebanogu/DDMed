import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToHomeComponent } from './add-to-home.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('AddToHomeComponent', () => {
  let component: AddToHomeComponent;
  let fixture: ComponentFixture<AddToHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToHomeComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(AddToHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
