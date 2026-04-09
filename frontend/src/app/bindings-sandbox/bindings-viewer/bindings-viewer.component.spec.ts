import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BindingsViewerComponent } from './bindings-viewer.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('BindingsViewerComponent', () => {
  let component: BindingsViewerComponent;
  let fixture: ComponentFixture<BindingsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BindingsViewerComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(BindingsViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
