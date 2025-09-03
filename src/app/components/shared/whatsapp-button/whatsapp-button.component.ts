import { Component } from '@angular/core';

@Component({
  selector: 'a[app-whatsapp-button]',
  standalone: true,
  host: { 
    class: 'fixed sm:bottom-8 sm:right-8 right-6 bottom-6 p-4 rounded-full shadow-lg text-stone-50 bg-green-500 hover:bg-green-600 transition-colors z-[999]',
    href: 'https://wa.me/+5579996121414?text=Ol%C3%A1,%20desejo%20solicitar%20um%20or%C3%A7amento!',
    target: '_blank',
    label: 'Fazer orçamento'
  },
  imports: [],
  template: `
  <i class="fi fi-brands-whatsapp flex text-2xl"></i>
  `
})
export class WhatsappButtonComponent {

}
