import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriageGameComponent } from './triage-game.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('TriageGameComponent', () => {
  let component: TriageGameComponent;
  let fixture: ComponentFixture<TriageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TriageGameComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(TriageGameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
