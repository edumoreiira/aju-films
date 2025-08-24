import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { CardsSectionComponent } from "../../components/layout/cards-section/cards-section.component";
import { VideoCardComponent } from "../../components/layout/video-card/video-card.component";
import { FooterComponent } from "../../components/layout/footer/footer.component";
import { IntersectionObserveDirective } from '../../directives/intersection-observe.directive';
import { PreloadVideosService } from '../../services/preloadVideos/preload-videos.service';
import { NgClass } from '@angular/common';
import { fadeTrigger } from '../../animations/transitions.animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsSectionComponent, VideoCardComponent, FooterComponent, IntersectionObserveDirective, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeTrigger]
})
export class HomeComponent implements OnInit {
  private preloadService = inject(PreloadVideosService);
  private zone = inject(NgZone);
  headerTexts = [
    {
      largeText: "7 anos",
      smallText: "de excelência em aplicação de películas em residências e comércios"
    },
    {
      largeText: "1.500+",
      smallText: "janelas transformadas com películas de alta performance"
    },
    {
      largeText: "20 tipos +",
      smallText: "de películas para garantir proteção solar, privacidade, segurança e estética."
    }
  ]
  selectedHeaderTextIndex = signal(0);

  private intervalId: any;

  ngOnInit(): void {
    this.startHeaderTextRotator();
  }

  startHeaderTextRotator() {
    this.zone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        const current = this.selectedHeaderTextIndex();
        const next = (current + 1) % this.headerTexts.length;
        this.selectedHeaderTextIndex.set(next);
      }, 4000);
    })
  }

  setHeaderText(index: number) {
    this.selectedHeaderTextIndex.set(index);
    clearInterval(this.intervalId);
    this.startHeaderTextRotator();
  }

  preloadVideos() {
    const videosUrl = ["./videos/residencial-converted.mp4", "./videos/comercial-converted.mp4", "./videos/privacidade-converted.mp4"]

    this.preloadService.preloadVideos(videosUrl)
  }
}
