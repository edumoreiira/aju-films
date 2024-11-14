import { Component } from '@angular/core';
import { VideoCard } from '../../../models/video-card.interface';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations/transitions.animation';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
  animations: [fadeInOut]
})
export class VideoCardComponent {
  selectedVideoCard = 1;
  videoCards: VideoCard[] = [
    {
      id: 1,
      title: 'Residencial',
      description: 'A aplicação da película trouxe proteção e uma renovação estética ao ambiente, combinando alta durabilidade com um visual moderno. A casa agora conta com um toque de elegância, além de proteção eficiente contra raios UV.',
      videoUrl: '/videos/residencial-trabalho.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: '5h 30min',
      barIcon: 'fi-br-house-chimney',
      barText: 'Aplicação residencial',
      progress: 0,
    },
    {
      id: 2,
      title: 'Comercial',
      description: 'A aplicação de nossa película comercial trouxe não só proteção e conforto, mas também uma renovação estética para o ambiente. Com materiais de alta qualidade, garantimos durabilidade e resistência, além de um visual moderno e elegante que valoriza o espaço. A casa agora conta com uma proteção discreta e eficiente contra raios UV, mantendo-se fresca e sofisticada ao mesmo tempo.',
      videoUrl: '/videos/residencial-resultado.mp4',
      footer1: 'Tempo total de aplicação',
      footer2: 'Tutorial',
      barIcon: 'fi-br-building',
      barText: 'Aplicação comercial',
      progress: 0,
    },
  ]

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
