import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

export interface FilmDetail {
  title: string;
  rate: number;
  text: string;
  info: { large_text: string, small_text: string }[];
}

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss'
})
export class FilmDetailsComponent {
  films = input.required<FilmDetail[]>();

}
