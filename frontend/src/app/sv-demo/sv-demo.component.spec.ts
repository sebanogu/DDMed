import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SvDemoComponent } from './sv-demo.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('SvDemoComponent', () => {
  let component: SvDemoComponent;
  let fixture: ComponentFixture<SvDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SvDemoComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(SvDemoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
