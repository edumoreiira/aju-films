import { Component, signal } from '@angular/core';
import { FILM_DETAILS } from '../../../../../assets/static-data';
import { FilmDetail } from '../film-details/film-details.component';
import { CarouselComponent, CarouselItemDirective } from "../../shared/carousel/carousel.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-films-info',
  standalone: true,
  imports: [CarouselComponent, CarouselItemDirective, NgClass],
  templateUrl: './films-info.component.html',
  styleUrl: './films-info.component.scss'
})
export class FilmsInfoComponent {
  films: FilmDetail[] = FILM_DETAILS
  limitElementHeight = signal(true);
  isTextsClamped = signal([]);
  activeItem = 0;
  autoslide = true;

  disableLimitElementHeight() {
    return
  }
}
