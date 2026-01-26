import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Player} from '../player/player';
import {Sidebar} from '../sidebar/sidebar';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    Player,
    Sidebar,
    Navbar
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
