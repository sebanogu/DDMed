import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhaserGameComponent } from './phaser-game.component';
import { createShallowProviders, shallowTestImports, shallowTestSchemas } from 'src/testing/shallow-test-helpers';

describe('PhaserGameComponent', () => {
  let component: PhaserGameComponent;
  let fixture: ComponentFixture<PhaserGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhaserGameComponent],
      imports: [...shallowTestImports],
      providers: createShallowProviders(),
      schemas: shallowTestSchemas
    }).compileComponents();

    fixture = TestBed.createComponent(PhaserGameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
