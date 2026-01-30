import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsList } from './songs-list';

describe('SongsList', () => {
  let component: SongsList;
  let fixture: ComponentFixture<SongsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
