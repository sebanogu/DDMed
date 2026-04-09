import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FsnChangesComponent } from './fsn-changes.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('FsnChangesComponent', () => {
  let component: FsnChangesComponent;
  let fixture: ComponentFixture<FsnChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FsnChangesComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(FsnChangesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
