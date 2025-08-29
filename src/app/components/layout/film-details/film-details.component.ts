import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss'
})
export class FilmDetailsComponent {

  films = [1,2,3,4,5,6,7,8];

}
