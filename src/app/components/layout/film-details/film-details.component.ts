import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, viewChild, signal, OnInit, model, NgZone, HostListener, QueryList, viewChildren } from '@angular/core';
import { createAnimation } from '../../../animations/transitions.animation';

export interface FilmDetail {
  title: string;
  top_seller?: boolean;
  text: string;
  info: { large_text: string, small_text: string }[];
}

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
  animations: [createAnimation('fadeIn', {})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmDetailsComponent implements OnInit, AfterViewInit {
  private zone = inject(NgZone);
  private renderer = inject(Renderer2);
  // ViewChild references
  private readonly itemRef = viewChild('itemEl', { read: ElementRef });
  private readonly containerRef = viewChild('containerEl', { read: ElementRef });
  private readonly textsRef = viewChildren('textEl');
  private itemElement!: HTMLElement
  private containerElement!: HTMLElement
  // 
  films = model.required<FilmDetail[]>();
  isTextsClamped = signal<boolean[]>([]);
  limitElementHeight = signal(true);
  private mouseMoveHandler?: (event: MouseEvent) => void;
  private touchMoveHandler?: (event: TouchEvent) => void;
  private filmInterval: any;
  // State
  protected state = signal({
    itemWidth: 0,
    currentItem: 1,
    currentPosition: 0,
    lastMovement: 0,
    autoslide: false
  });

  ngOnInit(): void {
    this.cloneFirstAndLastFilm();
    this.startAutoSlide();
  }


  ngAfterViewInit(): void {
    this.itemElement = this.itemRef()?.nativeElement;
    this.containerElement = this.containerRef()?.nativeElement;
    this.updateClampedTextsStatus();
    this.updateItemWidth();
  }

  protected next() {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const filmLength = this.films().length;
    if(this.state().currentItem >= filmLength -1) {
      this.navigateToItem(1);
    } else {
      this.navigateToItem(this.state().currentItem + 1);
    }
  }

  protected previous() {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const filmLength = this.films().length;
    if(this.state().currentItem <= 0) {
      this.navigateToItem(filmLength);
    } else {
      this.navigateToItem(this.state().currentItem - 1);
    }
  }

  protected navigateToItem(index: number, animate: boolean = true) {
    if(this.limitElementHeight() === false) this.enableLimitElementHeight();
    const widthToMove = index * -this.state().itemWidth;
    if(this.state().autoslide) this.resetAutoSlide();
    this.state.update(state => {
      state.currentItem = index;
      state.currentPosition = widthToMove;
      return state;
    })
    this.translateContainer(widthToMove, animate);
  }

  protected onMouseDown(event: MouseEvent, element: HTMLElement) {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const currentAutoSlide = this.state().autoslide;
    this.stopAutoSlide();
    this.removeTransitionClasses(element);
    const startMousePosition = event.clientX;
    this.mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e, startMousePosition);
    element.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', () => { this.onMouseUp(element, currentAutoSlide) }, { once: true });
  }

  protected onTouchStart(event: TouchEvent, element: HTMLElement) {
    if(this.isLastOrFirstItem()) return;
    const currentAutoSlide = this.state().autoslide;
    this.stopAutoSlide();
    this.removeTransitionClasses(element);
    const startTouch = event.touches[0];
    const startTouchPositionX = startTouch.clientX;
    const startTouchPositionY = startTouch.clientY;
    let direction: 'undecided' | 'horizontal' | 'vertical' = 'undecided';

    this.touchMoveHandler = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const currentTouch = e.touches[0];
      const dx = Math.abs(currentTouch.clientX - startTouchPositionX);
      const dy = Math.abs(currentTouch.clientY - startTouchPositionY);

      if (direction === 'undecided') {
        if (dx > 10 || dy > 10) { // threshold para evitar falsos positivos
          direction = dx > dy ? 'horizontal' : 'vertical';
        } else {
          return;
        }
      }

      if (direction === 'horizontal') {
        e.preventDefault();
        this.onTouchMove(e, startTouchPositionX, element);
      }
      // se for vertical, não faz nada (deixa scrollar até touchstart ser chamado novamente)
    };

    element.addEventListener('touchmove', this.touchMoveHandler, { passive: false });
    document.addEventListener('touchend', () => { this.onTouchEnd(element, currentAutoSlide) }, { passive: false, once: true });
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
    event.preventDefault();
    const currentTouchPosition = event.touches[0].clientX;
    const movement = start - currentTouchPosition;
    const newPosition = this.state().currentPosition - movement;
    this.translateContainer(newPosition);
    this.state.update(state => {
      state.lastMovement = movement;
      return state;
    });
  }

  private onMouseUp(element: HTMLElement, resumeAutoSlide: boolean) {
    if(resumeAutoSlide) this.startAutoSlide();
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

  private onTouchEnd(element: HTMLElement, resumeAutoSlide: boolean) {
    if(resumeAutoSlide) this.startAutoSlide();
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

  private translateContainer(width: number, animate: boolean = true) {
    const container = this.containerElement;
    if(animate) {
      this.renderer.setStyle(container, 'transform', `translateX(${ width }px)`);
    } else {
      this.removeTransitionClasses(container);
      this.renderer.setStyle(container, 'transform', `translateX(${ width }px)`);
      setTimeout(() => {
        this.addTransitionClasses(container);
      });
    }
  }

  protected onTransitionEnd() {
    const lastItemIndex = this.films().length - 2;
    if(this.state().currentItem <= 0) {
      this.navigateToItem(lastItemIndex, false);
    } else if(this.state().currentItem >= this.films().length - 1) {
      this.navigateToItem(1, false);
    }
  }

  private cloneFirstAndLastFilm() {
    const firstFilm = this.films()[0];
    const lastFilm = this.films()[this.films().length - 1];
    const newArr = [lastFilm, ...this.films(), firstFilm];
    this.films.set(newArr);
  }

  private isLastOrFirstItem(): boolean {
    return this.state().currentItem <= 0 || this.state().currentItem >= this.films().length - 1;
  }

  protected startAutoSlide() {
    this.zone.runOutsideAngular(() => {
      this.filmInterval = setInterval(() => {
        this.next();
      }, 10000);
    })
    this.state.update(state => ({
      ...state,
      autoslide: true
    }));
  }

  protected stopAutoSlide() {
    if (this.filmInterval) {
      clearInterval(this.filmInterval);
      this.filmInterval = null;
    }
    this.state.update(state => ({
      ...state,
      autoslide: false
    }));
  }

  private resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  private updateItemWidth() {
    this.state.update(state => { 
      state.itemWidth = this.itemElement.offsetWidth 
      return state;
    })
    this.navigateToItem(this.state().currentItem, false);
  }

    protected disableLimitElementHeight() {
    this.limitElementHeight.set(false);
  }

  protected enableLimitElementHeight() {
    this.limitElementHeight.set(true);
  }

  private updateClampedTextsStatus() {
    const texts = (this.textsRef() as ElementRef[]).map(ref => ref.nativeElement);
    let isTextsClampedArr: boolean[] = [];
    texts.forEach((element, index) => {
      isTextsClampedArr.push(element.scrollHeight > element.clientHeight);
    })
    this.isTextsClamped.set(isTextsClampedArr);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemWidth();
    this.updateClampedTextsStatus();
  }

}
