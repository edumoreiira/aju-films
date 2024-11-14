import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[videoLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = this.elementRef.nativeElement as HTMLVideoElement;
          video.src = video.getAttribute('data-src')!;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '400px'
    }
  
  );

    observer.observe(this.elementRef.nativeElement);
  }
}