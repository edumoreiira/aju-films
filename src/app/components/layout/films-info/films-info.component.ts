import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChildren } from '@angular/core';
import { FILM_DETAILS } from '../../../../../assets/static-data';
import { CarouselComponent, CarouselItemDirective } from "../../utils/carousel/carousel.component";
import { NgClass } from '@angular/common';
import { createAnimation } from '../../../animations/transitions.animation';

export interface FilmDetail {
  title: string;
  top_seller?: boolean;
  text: string;
  info: { large_text: string, small_text: string }[];
}

@Component({
  selector: 'article[app-films-info]',
  standalone: true,
  host: {
    class:'flex flex-col rounded-2xl border border-stone-200 w-[min(700px,100%)] mx-auto shadow-sm overflow-hidden',
    '(window:resize)': 'updateClampedTextsStatus()'
  },
  imports: [CarouselComponent, CarouselItemDirective, NgClass],
  templateUrl: './films-info.component.html',
  styleUrl: './films-info.component.scss',
  animations: [createAnimation('fadeIn', { transform: 'translateY(20px)' })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsInfoComponent implements AfterViewInit {
  private readonly textsRef = viewChildren('textEl');
  // 
  films: FilmDetail[] = FILM_DETAILS
  limitElementHeight = signal(true);
  isTextsClamped = signal<boolean[]>([]);
  activeItem = signal(0);
  autoslide = signal(true);

  ngAfterViewInit(): void {
    this.updateClampedTextsStatus();
  }

  private updateClampedTextsStatus() {
    const texts = (this.textsRef() as ElementRef[]).map(ref => ref.nativeElement);
    let isTextsClampedArr: boolean[] = [];
    texts.forEach((element, index) => {
      isTextsClampedArr.push(element.scrollHeight > element.clientHeight);
    })
    this.isTextsClamped.set(isTextsClampedArr);
  }

  handleAutoSlide(status: boolean) {
    this.autoslide.set(status);
  }

  protected disableLimitElementHeight() {
    this.limitElementHeight.set(false);
  }

  protected enableLimitElementHeight() {
    this.limitElementHeight.set(true);
  }

  protected handleNavigateToItem(index: number) {
    this.activeItem.set(index);
    this.enableLimitElementHeight();
  }

}
