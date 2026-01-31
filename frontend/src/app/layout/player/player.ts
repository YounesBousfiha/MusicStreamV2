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
