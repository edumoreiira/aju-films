import { Component } from '@angular/core';
import { CardsSectionComponent } from "../../components/layout/cards-section/cards-section.component";
import { VideoCardComponent } from "../../components/layout/video-card/video-card.component";
import { FooterComponent } from "../../components/layout/footer/footer.component";
import { IntersectionObserveDirective } from '../../directives/intersection-observe.directive';
import { PreloadVideosService } from '../../services/preloadVideos/preload-videos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsSectionComponent, VideoCardComponent, FooterComponent, IntersectionObserveDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private preloadService: PreloadVideosService) { }

  preloadVideos() {
    const videosUrl = ["./videos/residencial.mp4", "./videos/comercial-trabalho.mp4", "./videos/privacidade.mp4"]

    this.preloadService.preloadVideos(videosUrl)
  }
}
