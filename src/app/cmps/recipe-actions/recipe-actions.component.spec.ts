import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeActionsComponent } from './recipe-actions.component';

describe('RecipeActionsComponent', () => {
  let component: RecipeActionsComponent;
  let fixture: ComponentFixture<RecipeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
