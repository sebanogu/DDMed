import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NcptComponent } from './ncpt.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('NcptComponent', () => {
  let component: NcptComponent;
  let fixture: ComponentFixture<NcptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NcptComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(NcptComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
