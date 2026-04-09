import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefsetViewerComponent } from './refset-viewer.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('RefsetViewerComponent', () => {
  let component: RefsetViewerComponent;
  let fixture: ComponentFixture<RefsetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefsetViewerComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(RefsetViewerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
