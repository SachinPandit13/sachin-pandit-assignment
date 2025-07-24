import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from './shared/components';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'pmuy-frontend';
}
