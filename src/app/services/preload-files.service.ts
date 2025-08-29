import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadFilesService {

  async preloadVideos(videosSrc: string[]) {
    for(const videoSrc of videosSrc) {
      //carrega os videos um após o outro.
      await this.loadVideo(videoSrc);
    }
  }

  async preloadImages(imagesSrc: string[]) {
    for(const imageSrc of imagesSrc) {
      await this.loadImage(imageSrc);
    }
  }

  private loadVideo(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';

      //resolve a promise depois de o video carregar.
      video.addEventListener('progress', (event) => resolve(), { once: true });
      video.addEventListener('error', (err) => reject(err), { once: true });

    })
  }

  private loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', (err) => reject(err), { once: true });
    })
  }
  

}
