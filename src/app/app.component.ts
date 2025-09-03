import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { WhatsappButtonComponent } from "./components/shared/whatsapp-button/whatsapp-button.component";
import { DocumentListenerService } from './services/document-listener.service';
import { createAnimation } from './animations/transitions.animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, WhatsappButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [createAnimation('popUp', { transform: 'translateY(150%)', duration: '300ms' })]
})
export class AppComponent {
  protected documentListener = inject(DocumentListenerService);
  title = 'Aju-Films';
}
