import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMainComponent } from './context-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('ContextMainComponent', () => {
  let component: ContextMainComponent;
  let fixture: ComponentFixture<ContextMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
