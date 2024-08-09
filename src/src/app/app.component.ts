import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarouselSlideComponent, NgxCarouselComponent} from "ngx-carousel";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxCarouselComponent, CarouselSlideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'src';
}
