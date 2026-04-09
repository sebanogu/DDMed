import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsMainComponent } from './reports-main.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('ReportsMainComponent', () => {
  let component: ReportsMainComponent;
  let fixture: ComponentFixture<ReportsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsMainComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsMainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
