import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPostListComponent } from './feed-post-list.component';

describe('FeedPostListComponent', () => {
  let component: FeedPostListComponent;
  let fixture: ComponentFixture<FeedPostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedPostListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
