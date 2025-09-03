import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, contentChild, DestroyRef, Directive, ElementRef, inject, input, model, NgZone, OnDestroy, OnInit, output, Renderer2, signal, TemplateRef } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';

@Directive({
  selector: '[carouselItem]',
  standalone: true
})
export class CarouselItemDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit(): void {
    this.el.nativeElement.classList.add('carousel-item');
    this.el.nativeElement.style.position = 'relative';
  }

}

@Component({
  selector: 'app-carousel',
  standalone: true,
  host: {
    class: 'w-full transition-transform duration-500 grid grid-flow-col auto-cols-[100%]',
    '(mousedown)': 'onMouseDown($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(dragstart)': '$event.preventDefault()',
    '(transitionend)': 'onTransitionEnd()',
    '(window:resize)': 'updateItemWidth()'
  },
  imports: [NgTemplateOutlet],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  // 
  protected itemTemplateRef = contentChild.required(TemplateRef);
  private carouselItemElementRef = contentChild.required(CarouselItemDirective, { read: ElementRef });
  // 
  items = model<any[]>([]);
  autoSlideinterval = input(10000, { alias: 'interval' });
  autoSlide = input(true);
  // 
  autoSlideStatus = output<boolean>();
  onNavigateToItem = output<number>();
  // 
  private mouseMoveHandler?: (event: MouseEvent) => void;
  private touchMoveHandler?: (event: TouchEvent) => void;
  private readonly destroy$ = new Subject<void>;
  private autoslideSub?: Subscription;
  //
  protected state = signal({
    itemWidth: 0,
    currentItem: 1,
    currentPosition: 0,
    lastMovement: 0,
    autoSlide: false
  });

  ngOnInit(): void {
    this.cloneFirstAndLastFilm();
    if(this.autoSlide()) this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    if(!this.carouselItemElementRef()) {
      console.error('Aplique a diretiva `carouselItem` no container do item (ex: <div carouselItem>...</div>)')
    }
    this.updateItemWidth();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  next() {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const filmLength = this.items().length;
    if(this.state().currentItem >= filmLength -1) {
      this.navigateToItem(1);
    } else {
      this.navigateToItem(this.state().currentItem + 1);
    }
  }

  previous() {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const filmLength = this.items().length;
    if(this.state().currentItem <= 0) {
      this.navigateToItem(filmLength);
    } else {
      this.navigateToItem(this.state().currentItem - 1);
    }
  }

  private navigateToItem(index: number, animate: boolean = true) {
    const widthToMove = index * -this.state().itemWidth;
    const adjustedIndex = index - 1;
    if(this.state().autoSlide) this.resetAutoSlide();
    if(this.state().currentItem !== index) { this.onNavigateToItem.emit(adjustedIndex); } // Emit event only if current item changes
    this.state.update(state => {
      state.currentItem = index;
      state.currentPosition = widthToMove;
      return state;
    })
    this.translateContainer(widthToMove, animate);
  }

  setCurrentItem(index: number) {
    this.navigateToItem(index + 1);
  }

  protected onMouseDown(event: MouseEvent) {
    if(this.isLastOrFirstItem()) return; // prevent skipping animation on last or first item, applied by onTransitionEnd()
    const element = this.el.nativeElement;
    const currentAutoSlide = this.state().autoSlide;
    this.stopAutoSlide();
    this.removeTransitionClasses(element);
    const startMousePosition = event.clientX;
    this.mouseMoveHandler = (e: MouseEvent) => this.onMouseMove(e, startMousePosition);
    element.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', () => { this.onMouseUp(element, currentAutoSlide) }, { once: true });
  }

  protected onTouchStart(event: TouchEvent) {
    if(this.isLastOrFirstItem()) return;
    const element = this.el.nativeElement;
    const currentAutoSlide = this.state().autoSlide;
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
        if (dx > 8 || dy > 8) { // threshold para evitar falsos positivos
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
    const container = this.el.nativeElement;
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
    const lastItemIndex = this.items().length - 2;
    if(this.state().currentItem <= 0) {
      this.navigateToItem(lastItemIndex, false);
    } else if(this.state().currentItem >= this.items().length - 1) {
      this.navigateToItem(1, false);
    }
  }

  private cloneFirstAndLastFilm() {
    const firstFilm = this.items()[0];
    const lastFilm = this.items()[this.items().length - 1];
    const newArr = [lastFilm, ...this.items(), firstFilm];
    this.items.set(newArr);
  }

  private isLastOrFirstItem(): boolean {
    return this.state().currentItem <= 0 || this.state().currentItem >= this.items().length - 1;
  }

  startAutoSlide() {
    this.zone.runOutsideAngular(() => {
      const slideInterval = this.autoSlideinterval();
      const interval$ = interval(slideInterval).pipe(
        takeUntil(this.destroy$)
      );
      this.autoslideSub = interval$.subscribe(() => this.next());
    })
    this.state.update(state => ({
      ...state,
      autoSlide: true
    }));
    this.autoSlideStatus.emit(true);
  }

  stopAutoSlide() {
    if(this.autoslideSub) {
      this.autoslideSub.unsubscribe();
      this.autoslideSub = undefined;

      // this.state.update(state => ({
      //   ...state,
      //   autoSlide: false
      // }));
      this.autoSlideStatus.emit(false);
    }
  }

  private resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  private updateItemWidth() {
    const itemElement = this.carouselItemElementRef().nativeElement;
    this.state.update(state => { 
      state.itemWidth = itemElement.offsetWidth 
      return state;
    })
    this.navigateToItem(this.state().currentItem, false);
  }

}