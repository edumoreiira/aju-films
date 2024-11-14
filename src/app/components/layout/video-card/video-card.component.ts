import { Component } from '@angular/core';
import { VideoCard } from '../../../models/video-card.interface';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {
  videoCards: VideoCard[] = [
    {
      id: 1,
      title: 'Residencial',
      description: 'A aplicação de nossa película residencial trouxe não só proteção e conforto, mas também uma renovação estética para o ambiente. Com materiais de alta qualidade, garantimos durabilidade e resistência, além de um visual moderno e elegante que valoriza o espaço. A casa agora conta com uma proteção discreta e eficiente contra raios UV, mantendo-se fresca e sofisticada ao mesmo tempo.',
      videoUrl: '/videos/residencial-trabalho.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: 'Tutorial',
      barIcon: 'fi-br-house-chimney',
      barText: 'Aplicação residencial'
    },
    {
      id: 2,
      title: 'Comercial',
      description: 'A aplicação de nossa película comercial trouxe não só proteção e conforto, mas também uma renovação estética para o ambiente. Com materiais de alta qualidade, garantimos durabilidade e resistência, além de um visual moderno e elegante que valoriza o espaço. A casa agora conta com uma proteção discreta e eficiente contra raios UV, mantendo-se fresca e sofisticada ao mesmo tempo.',
      videoUrl: '/videos/comercial-trabalho.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: 'Tutorial',
      barIcon: 'fi-br-building',
      barText: 'Aplicação comercial'
    },
  ]

}
