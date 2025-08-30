import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, Renderer2, viewChild, signal, Signal } from '@angular/core';

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
  private readonly itemRef = viewChild('itemEl', { read: ElementRef });
  private readonly containerRef = viewChild('containerEl', { read: ElementRef });
  private itemElement!: HTMLElement
  private containerElement!: HTMLElement
  films = input.required<FilmDetail[]>();
  private mouseMoveHandler?: (event: MouseEvent) => void;
  private touchMoveHandler?: (event: TouchEvent) => void;

  state = signal({
    itemWidth: 0,
    currentItem: 0,
    currentPosition: 0,
    lastMovement: 0
  });

  ngAfterViewInit(): void {
    this.itemElement = this.itemRef()?.nativeElement;
    this.containerElement = this.containerRef()?.nativeElement;

    this.state.update(state => { 
      state.itemWidth = this.itemElement.offsetWidth 
      return state;
    })
    console.log(this.state());
  }

  next() {
    const filmLength = this.films().length;
    if(this.state().currentItem >= filmLength - 1) {
      this.navigateToItem(0);
    } else {
      this.navigateToItem(this.state().currentItem + 1);
    }
  }

  previous() {
    const filmLength = this.films().length;
    if(this.state().currentItem <= 0) {
      this.navigateToItem(filmLength - 1);
    } else {
      this.navigateToItem(this.state().currentItem - 1);
    }
  }

  navigateToItem(index: number) {
    const widthToMove = index * -this.state().itemWidth;
    this.state.update(state => {
      state.currentItem = index;
      state.currentPosition = widthToMove;
      return state;
    })
    this.translateContainer(widthToMove);
  }

  onMouseDown(event: MouseEvent, element: HTMLElement) {
    this.removeTransitionClasses(element);
    const startMousePosition = event.clientX;
    this.mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e, startMousePosition);
    element.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', () => { this.onMouseUp(element) }, { once: true });
  }

  onTouchStart(event: TouchEvent, element: HTMLElement) {
    this.removeTransitionClasses(element);
    const startTouchPosition = event.touches[0].clientX;
    this.touchMoveHandler = (e: TouchEvent) => this.onTouchMove(e, startTouchPosition, element);
    element.addEventListener('touchmove', this.touchMoveHandler);
    document.addEventListener('touchend', () => { this.onTouchEnd(element) }, { once: true });
  }

  private onMouseMove(event: MouseEvent, start: number) {
    const currentMousePosition = event.clientX;
    const movement = start - currentMousePosition;
    const newPosition = this.state().currentPosition - movement;
    this.translateContainer(newPosition);
    this.state.update(state => {
      state.lastMovement = movement;
      return state;
    });
  }

  private onTouchMove(event: TouchEvent, start: number, element: HTMLElement) {
    if (event.touches.length !== 1) return;
    const currentTouchPosition = event.touches[0].clientX;
    const movement = start - currentTouchPosition;
    const newPosition = this.state().currentPosition - movement;
    this.translateContainer(newPosition);
    this.state.update(state => {
      state.lastMovement = movement;
      return state;
    });
  }

  onMouseUp(element: HTMLElement) {
    this.addTransitionClasses(element);
    const lastMovement = this.state().lastMovement;
    if(lastMovement > 100) {
      this.next();
    } else if(lastMovement < -100) {
      this.previous();
    } else {
      this.navigateToItem(this.state().currentItem);
    }
    this.state.update(state => ({
      ...state, lastMovement: 0 // triggers change detection
    })); //clean it after changes

    if(this.mouseMoveHandler){
      element.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  onTouchEnd(element: HTMLElement) {
    this.addTransitionClasses(element);
    const lastMovement = this.state().lastMovement;
    if(lastMovement > 100) {
      this.next();
    } else if(lastMovement < -100) {
      this.previous();
    } else {
      this.navigateToItem(this.state().currentItem);
    }
    this.state.update(state => ({
      ...state, lastMovement: 0
    }));

    if(this.touchMoveHandler){
      element.removeEventListener('touchmove', this.touchMoveHandler);
    }
  }

  private addTransitionClasses(element: HTMLElement) {
    element.classList.add('duration-500','transition-transform');
  }

  private removeTransitionClasses(element: HTMLElement) {
    element.classList.remove('duration-500','transition-transform');
  }

  private translateContainer(width: number) {
    const container = this.containerElement;
    this.renderer.setStyle(container, 'transform', `translateX(${ width }px)`);
  }

}
