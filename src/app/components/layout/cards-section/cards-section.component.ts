import { Component } from '@angular/core';
import { Card } from '../../../models/card.interface';

@Component({
  selector: 'app-cards-section',
  standalone: true,
  imports: [],
  templateUrl: './cards-section.component.html',
  styleUrl: './cards-section.component.scss'
})
export class CardsSectionComponent {
  cards: Card[] = [
    {
      icon: 'fi-br-time-fast',
      title: 'Instalação no Mesmo Dia',
      description: 'Agende a aplicação no mesmo dia e transforme seu lar. Verifique a disponibilidade!'
    },
    {
      icon: 'fi-br-research-arrows-circle',
      title: 'Economia de Energia',
      description: 'Reduza o consumo de energia mantendo sua casa na temperatura ideal.'
    },
    {
      icon: 'fi-br-low-vision',
      title: 'Privacidade Sob Medida',
      description: 'Garantimos privacidade sem bloquear a luz natural, com tecnologia de controle de visibilidade.'
    },
    {
      icon: 'fi-br-brightness',
      title: 'Proteção Solar',
      description: 'Bloqueie até 99% dos raios UV, protegendo sua casa e preservando seus móveis.'
    },
    {
      icon: 'fi-br-shield-check',
      title: 'Durabilidade e Resistência',
      description: 'Películas de alta qualidade, resistentes a arranhões e fáceis de manter.'
    },
    {
      icon: 'fi-br-graphic-style',
      title: 'Acabamentos Modernos',
      description: 'Películas com design sofisticado e várias opções de acabamento para seu espaço.'
    }
  ];

}
