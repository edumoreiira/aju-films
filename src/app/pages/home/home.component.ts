import { Component } from '@angular/core';
import { CardsSectionComponent } from "../../components/layout/cards-section/cards-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
