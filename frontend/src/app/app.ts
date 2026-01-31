import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from './shared/components/toast/toast';
import {PlayerStore} from './core/store/player.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('frontend');

  readonly playerStore = inject(PlayerStore);

  ngOnInit() {
    this.playerStore.initAudioEvents();
  }
}
