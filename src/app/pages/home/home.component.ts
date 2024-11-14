import { Component } from '@angular/core';
import { CardsSectionComponent } from "../../components/layout/cards-section/cards-section.component";
import { VideoCardComponent } from "../../components/layout/video-card/video-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsSectionComponent, VideoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
