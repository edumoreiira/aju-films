import { Component, OnInit } from '@angular/core';
import { VideoCard } from '../../../models/video-card.interface';
import { CommonModule } from '@angular/common';
import { fadeSlide, queryAnimation } from '../../../animations/transitions.animation';
import { IntersectionObserveDirective } from '../../../directives/intersection-observe.directive';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, IntersectionObserveDirective],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
  animations: [fadeSlide, queryAnimation]
})
export class VideoCardComponent {
  selectedVideoCard = 1;
  videoCards: VideoCard[] = [
    {
      id: 1,
      title: 'Residencial',
      description: 'A aplicação da película trouxe proteção e uma renovação estética ao ambiente, combinando alta durabilidade com um visual moderno. A casa agora conta com um toque de elegância, além de proteção eficiente contra raios UV.',
      videoUrl: './videos/residencial-converted.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: '5h 30min',
      barIcon: 'fi-rr-house-chimney',
      barText: 'Aplicação residencial',
      progress: 0,
    },
    {
      id: 2,
      title: 'Comercial',
      description: 'A fachada do Sicoob foi modernizada com película de proteção solar, proporcionando um visual elegante e moderno, além do conforto térmico e privacidade  para colaboradores e clientes.',
      videoUrl: './videos/comercial-converted.mp4',
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
      videoUrl: './videos/privacidade-converted.mp4',
      footer1: 'Modelo de película',
      footer2: 'Espelhado',
      barIcon: 'fi-rr-eye-crossed',
      barText: 'Privacidade garantida',
      progress: 0,
    },
  ]

  setVideoCard(id: number) {
    const currentVideo = this.videoCards[this.selectedVideoCard - 1]
    currentVideo.progress = 0; //reset progress bar
    this.selectedVideoCard = id;
  }

  nextVideoCard() {
    if(this.selectedVideoCard === this.videoCards.length) {
      this.setVideoCard(1);
    } else {
      this.setVideoCard(this.selectedVideoCard + 1);
    }
  }

  previousVideoCard() {
    if(this.selectedVideoCard === 1) {
      this.setVideoCard(this.videoCards.length);
    } else {
      this.setVideoCard(this.selectedVideoCard - 1);
    }
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
    this.nextVideoCard();
  }

  onLoadedVideo(event: Event) {
    const element = event.target as HTMLElement;
    element.classList.remove('skeleton');
  }


  

}
