import {By} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {PlayerStore} from '../../../core/store/player.store';
import {SongCard} from './song-card';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signal} from '@angular/core';

describe('SongCard', () => {
  let component: SongCard;
  let fixture: ComponentFixture<SongCard>;

  const mockPlayerStore = {
    play: (song: any) => {},
    currentSong: signal(null),
    isPlaying: signal(false)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongCard],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PlayerStore, useValue: mockPlayerStore }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SongCard);
    component = fixture.componentInstance;

    component.data = mockSong;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  const mockSong = {
    id: 1,
    title: 'Test Song Title',
    artist: 'Test Artist',
    cover: 'cover.jpg',
    songUrl: 'song.mp3',
    duration: 500,
    createdAt: "",
    coverUrl: 'http://localhost:8080/cover.jpg'
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the song title correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleElement.textContent).toContain('Test Song Title');
  });

  it('should display artist name correctly', () => {
    const artistElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(artistElement.textContent).toContain('Test Artist');
  });

  it('should call playerStore play() when clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', new Event('click'));

    expect(mockPlayerStore.play).toHaveBeenCalledWith(mockSong);
  })
});
