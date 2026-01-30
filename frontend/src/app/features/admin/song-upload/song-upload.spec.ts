import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongUpload } from './song-upload';

describe('SongUpload', () => {
  let component: SongUpload;
  let fixture: ComponentFixture<SongUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
