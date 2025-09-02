import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FILM_DETAILS } from '../../../../../assets/static-data';
import { FilmDetail } from '../film-details/film-details.component';
import { CarouselComponent, CarouselItemDirective } from "../../shared/carousel/carousel.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'article[app-films-info]',
  standalone: true,
  host: {
    class:'flex flex-col rounded-2xl border border-stone-200 w-[min(700px,100%)] mx-auto shadow-sm overflow-hidden'
  },
  imports: [CarouselComponent, CarouselItemDirective, NgClass],
  templateUrl: './films-info.component.html',
  styleUrl: './films-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
