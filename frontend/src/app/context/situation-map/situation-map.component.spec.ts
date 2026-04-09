import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SituationMapComponent } from './situation-map.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('SituationMapComponent', () => {
  let component: SituationMapComponent;
  let fixture: ComponentFixture<SituationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SituationMapComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(SituationMapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
