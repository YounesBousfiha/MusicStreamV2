import {Component, computed, inject} from '@angular/core';
import {PlayerStore} from '../../core/store/player.store';
import {ImgUrlPipe} from '../../core/pipes/img-url-pipe';

@Component({
  selector: 'app-player',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player {

  readonly playerStore = inject(PlayerStore);

  formatTime(time: number): string {
    if (!time || isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    // مثلاً 5 ثواني كتولي "05"
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  progressPercent = computed(() => {
    const duration = this.playerStore.duration() || 1; // تفادي القسمة على 0
    return (this.playerStore.currentTime() / duration) * 100;
  });

  onToggle() {
    this.playerStore.toggle();
  }

  onVolumeChange(e: any) {
    this.playerStore.setVolume(e.target.value / 100);
  }
}
