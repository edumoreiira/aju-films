import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isScrolled = false;
  isScrolledLimit = false;

  ngOnInit(): void {
    if(typeof window !== 'undefined') {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkScroll();
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 50;
    this.isScrolledLimit = window.scrollY > 600;
  }

}
