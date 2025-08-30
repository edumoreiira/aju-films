import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, Renderer2, viewChild } from '@angular/core';

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
  styleUrl: './film-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private readonly itemRef = viewChild('item', { read: ElementRef });
  private readonly containerRef = viewChild('container', { read: ElementRef });
  private itemElement!: HTMLElement
  private containerElement!: HTMLElement
  films = input.required<FilmDetail[]>();
  
  state = {
    itemWidth: 0,
    currentItem: 0,
    currentPosition: 0
  }

  ngAfterViewInit(): void {
    this.itemElement = this.itemRef()?.nativeElement;
    this.containerElement = this.containerRef()?.nativeElement;

    this.state.itemWidth = this.itemElement.offsetWidth;
    console.log(this.state)
  }

  next() {
    const filmLength = this.films().length;
    if(this.state.currentItem >= filmLength - 1) {
      this.navigateToItem(0);
    } else {
      this.navigateToItem(this.state.currentItem + 1);
    }
  }

  previous() {
    const filmLength = this.films().length;
    if(this.state.currentItem <= 0) {
      this.navigateToItem(filmLength - 1);
    } else {
      this.navigateToItem(this.state.currentItem - 1);
    }
  }

  navigateToItem(index: number) {
    const widthToMove = index * -this.state.itemWidth;
    this.state.currentItem = index;
    this.state.currentPosition = widthToMove;
    this.translateContainer(widthToMove);
  }

  private translateContainer(width: number) {
    const container = this.containerElement;
    this.renderer.setStyle(container, 'transform', `translateX(${ width }px)`);
  }
  



}
