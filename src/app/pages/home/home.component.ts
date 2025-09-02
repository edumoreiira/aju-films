import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { CardsSectionComponent } from "../../components/layout/cards-section/cards-section.component";
import { VideoCardComponent } from "../../components/layout/video-card/video-card.component";
import { FooterComponent } from "../../components/layout/footer/footer.component";
import { IntersectionObserveDirective } from '../../directives/intersection-observe.directive';
import { PreloadFilesService } from '../../services/preload-files.service';
import { NgClass } from '@angular/common';
import { fadeTrigger } from '../../animations/transitions.animation';
import { FilmsPreviewComponent } from "../../components/layout/films-preview/films-preview.component";
import { preloadUrls } from '../../../../assets/preload-urls';
import { FilmDetailsComponent } from '../../components/layout/film-details/film-details.component';
import { FILM_DETAILS, HEADER_TEXTS } from '../../../../assets/static-data';
import { FilmsInfoComponent } from "../../components/layout/films-info/films-info.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsSectionComponent, VideoCardComponent, FooterComponent, IntersectionObserveDirective, NgClass,
    FilmsPreviewComponent, FilmsInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private preloadService = inject(PreloadFilesService);
  private zone = inject(NgZone);
  videosHasLoaded = false;
  selectedHeaderTextIndex = signal(0);
  headerTexts = HEADER_TEXTS;
  filmDetails = FILM_DETAILS;

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
      }, 6000);
    })
  }

  setHeaderText(index: number) {
    this.selectedHeaderTextIndex.set(index);
    clearInterval(this.intervalId);
    this.startHeaderTextRotator();
  }

  private preloadVideos() {
    // const videosUrl = ["./videos/residencial-converted.mp4", "./videos/comercial-converted.mp4", "./videos/privacidade-converted.mp4"]
    const videosUrl = preloadUrls.videos;

    return this.preloadService.preloadVideos(videosUrl)
  }

  private preloadImages() {
    const imagesUrl = preloadUrls.images;

    return this.preloadService.preloadImages(imagesUrl);
  }

  handlePreloadFiles() {
    // this.preloadImages()
    this.preloadImages().then(() => {
      this.preloadVideos().then(() => {
        this.videosHasLoaded = true;
      });
    });
  }
}
