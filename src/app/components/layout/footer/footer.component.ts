import { Component } from '@angular/core';
import { IntersectionObserveDirective } from '../../../directives/intersection-observe.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IntersectionObserveDirective],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

}
