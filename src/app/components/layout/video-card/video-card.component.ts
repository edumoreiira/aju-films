import { Component, HostListener } from '@angular/core';
import { VideoCard } from '../../../models/video-card.interface';
import { CommonModule } from '@angular/common';
import { fadeSlide } from '../../../animations/transitions.animation';
import { LazyLoadDirective } from '../../../directives/lazyload.directive';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
  animations: [fadeSlide]
})
export class VideoCardComponent {
  selectedVideoCard = 1;
  animationState: 'up' | 'right' = window.innerWidth < 620 ? 'right' : 'up'; // switch state based on screen width
  videoCards: VideoCard[] = [
    {
      id: 1,
      title: 'Residencial',
      description: 'A aplicação da película trouxe proteção e uma renovação estética ao ambiente, combinando alta durabilidade com um visual moderno. A casa agora conta com um toque de elegância, além de proteção eficiente contra raios UV.',
      videoUrl: '/videos/residencial.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: '5h 30min',
      barIcon: 'fi-rr-house-chimney',
      barText: 'Aplicação residencial',
      progress: 0,
    },
    {
      id: 2,
      title: 'Comercial',
      description: 'A fachada da instituição financeira Sicoob foi modernizada com película de proteção solar, trazendo um visual elegante e atualizado. A aplicação oferece mais conforto térmico, privacidade e eficiência energética, beneficiando colaboradores e clientes',
      videoUrl: '/videos/comercial-trabalho.mp4',
      footer1: 'Modelo de película',
      footer2: 'Silver 20',
      barIcon: 'fi-rr-bank',
      barText: 'Aplicação comercial',
      progress: 0,
    },
    {
      id: 3,
      title: 'Privacidade Total',
      description: 'A película espelhada aplicada na porta do banheiro garante privacidade completa, bloqueando a visão externa sem perder o design moderno. Uma solução prática e elegante para ambientes que precisam de discrição.',
      videoUrl: '/videos/privacidade.mp4',
      footer1: 'Modelo de película',
      footer2: 'Espelhado',
      barIcon: 'fi-rr-eye-crossed',
      barText: 'Privacidade garantida',
      progress: 0,
    },
  ]

  @HostListener('window:resize')
  onResize() {
    this.animationState = window.innerWidth < 620 ? 'right' : 'up';
  }

  setVideoCard(id: number) {
    const currentVideo = this.videoCards[this.selectedVideoCard - 1]
    currentVideo.progress = 0; //reset progress bar
    this.selectedVideoCard = id;
  }

  nextVideoCard() {
    this.setVideoCard(this.selectedVideoCard + 1);
  }

  previousVideoCard() {
    this.setVideoCard(this.selectedVideoCard - 1);
  }
  
  updateProgress(video: HTMLVideoElement) {
    const videoProgress = (video.currentTime / video.duration) * 100
    const currentVideo = this.videoCards[this.selectedVideoCard - 1]

    currentVideo.progress = videoProgress;
  }

  togglePause(video: HTMLVideoElement) {
    video.paused ? video.play() : video.pause();
  }

  onVideoEnd() {

    if(this.selectedVideoCard < this.videoCards.length) {
      this.nextVideoCard(); // go to next video when current video ends
    } else {
      this.setVideoCard(1); // loop back to first video when last video ends
    }
  }

  

}
