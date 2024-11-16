import { Directive, ElementRef, input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[InterObs]',
  standalone: true
})
export class IntersectionObserveDirective implements OnInit {
  intersectChild = input(false);
  obsClass = input('observed');
  rootMargin = input('-150px')

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        
        if(!entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'out-of-view')
          return;
        }

        if(entry.isIntersecting) {
          this.renderer.removeClass(this.el.nativeElement, 'out-of-view');

          if(this.intersectChild() === true) {
            const children = this.el.nativeElement.children;
            const childrenArr = Array.from(children);
            childrenArr.forEach((child) => {
              const childElement = child as HTMLElement
              this.renderer.addClass(childElement, this.obsClass());
            });

          } else {
            this.renderer.addClass(this.el.nativeElement, this.obsClass()); // adiciona a classe ao elemento quando está interceptado
          }
        }
        observer.unobserve(this.el.nativeElement); // observar apenas uma vez
      })
    },
    { rootMargin: this.rootMargin() } // margem de distancia para ser interceptado
    )

    observer.observe(this.el.nativeElement);
  }

}
