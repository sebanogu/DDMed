import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EclBuilderDialogComponent } from './ecl-builder-dialog.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('EclBuilderDialogComponent', () => {
  let component: EclBuilderDialogComponent;
  let fixture: ComponentFixture<EclBuilderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EclBuilderDialogComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(EclBuilderDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
