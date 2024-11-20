import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadVideosService {

  constructor() { }

  async preloadVideos(videosSrc: string[]) {
    for(const videoSrc of videosSrc) {
      //carrega os videos um após o outro.
      await this.loadVideo(videoSrc);
    }
  }

  private loadVideo(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';

      //resolve a promise depois de o video carregar.
      video.addEventListener('progress', (event) => resolve());


      video.addEventListener('error', (err) => reject(err));
    })
  }

}
