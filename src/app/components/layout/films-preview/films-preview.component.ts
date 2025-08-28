import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCompareModule } from 'primeng/imagecompare';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Knob } from 'primeng/knob';
import { Select } from 'primeng/select';
import { NgClass } from '@angular/common';

interface Film {
    label: string;
    value: string;
}

type Place = 'exterior' | 'interior' | 'cozinha' | 'escritorio' | 'playground';

@Component({
  selector: 'app-films-preview',
  standalone: true,
  imports: [ImageCompareModule, SelectButtonModule, FormsModule, Select, Knob, NgClass],
  templateUrl: './films-preview.component.html',
  styleUrl: './films-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsPreviewComponent {
  selectOptions: any[] = [{ label: 'Interno', value: 'interior' },{ label: 'Externo', value: 'exterior' }];
  knobValue: number = 0;
  films: Film[] = [
    { label: 'Fumê', value: 'g' },
    { label: 'Espelhado', value: 'espelhado' },
    { label: 'Jateado Fosco', value: 'jateado-fosco' },
    { label: 'Branco Leitoso', value: 'jateado-leitoso' },
    { label: 'Blackout', value: 'blackout' },
    { label: 'Segurança', value: 'seguranca' },
  ];
  selectedFilm: Film | undefined = undefined;

  currentLocation: Place = 'cozinha';

  get knobLabel(): string {
    switch(this.knobValue) {
      case 0:
        return 'G-70';
      case 1:
        return 'G-50';
      case 2:
        return 'G-35';
      case 3:
        return 'G-20';
      case 4:
        return 'G-5';
      default:
        return '0';
    }
  }

  imagesUrl = {
    left: {
      "interior": "images/window-preview/interior.webp",
      "exterior": "images/window-preview/exterior.webp",
      "cozinha": "images/window-preview/cozinha.webp",
      "escritorio": "images/window-preview/escritorio.webp",
      "playground": "images/window-preview/playground.webp"
    },
    right: {
      "interior": {
        "espelhado": "images/window-preview/interior-35.webp",
        "blackout": "images/window-preview/interior-100.webp",
        "G-5": "images/window-preview/interior-50.webp",
        "G-20": "images/window-preview/interior-50.webp",
        "G-35": "images/window-preview/interior-35.webp",
        "G-50": "images/window-preview/interior-35.webp",
        "G-70": "images/window-preview/g70-interior.webp",
      },
      "exterior": {
        "espelhado": "images/window-preview/exterior-espelhado.webp",
        "blackout": "images/window-preview/g5-exterior.webp",
        "G-5": "images/window-preview/g5-exterior.webp",
        "G-20": "images/window-preview/g20-exterior.webp",
        "G-35": "images/window-preview/g35-exterior.webp",
        "G-50": "images/window-preview/g50-exterior.webp",
        "G-70": "images/window-preview/g70-exterior.webp",
      },
      "cozinha": 'images/window-preview/cozinha-jateado-branco.webp',
      "escritorio": 'images/window-preview/escritorio-jateada-fosca2.webp',
      "playground": 'images/window-preview/playground-seguranca.webp'
    }
  }

  get leftImageUrl(): string {
    return this.imagesUrl.left[this.currentLocation];
  }

  get rightImageUrl(): string {
    switch (this.currentLocation) {
      case 'cozinha':
        return this.imagesUrl.right.cozinha;
      case 'escritorio':
        return this.imagesUrl.right.escritorio;
      case 'playground':
        return this.imagesUrl.right.playground;
    }

    const key = (this.imagesUrl.right[this.currentLocation] as { [key: string]: string })

    if(this.selectedFilm?.value === 'g') {
      const selected_g_film = this.knobLabel
      return key[selected_g_film];
    }

    return key[this.selectedFilm?.value || 'espelhado'];
  }


  onFilmChange(film: Film) {
    switch (film.value) {
      case 'jateado-fosco':
        this.currentLocation = 'escritorio';
        break;
      case 'jateado-leitoso':
        this.currentLocation = 'cozinha';
        break;
      case 'seguranca':
      this.currentLocation = 'playground';
        break;
      default:
        this.currentLocation = 'exterior';
        break;
    }
  }



  // get imageUrl(): string {
  //   switch(this.selectValue) {
  //     case 'interior':
  //       return 'images/interior.png';
  //     case 'exterior':
  //       return 'images/exterior.png';
  //     default:
  //       return 'images/interior.png';
  //   }
  // }

  // get leftImageUrl(): string {
  //   switch(this.selectValue) {
  //     case 'interior':
  //       return 'images/interior.png';
  //     case 'exterior':
  //       return 'images/exterior.png';
  //     default:
  //       return 'images/interior.png';
  //   }
  // }

  // get rightImageUrl(): string {
  //   switch(this.selectValue) {
  //     case 'interior':
  //       return 'images/interior-refletida.png';
  //     case 'exterior':
  //       return 'images/exterior-refletida.png';
  //     default:
  //       return 'images/interior-refletida.png';
  //   }
  // }






}
