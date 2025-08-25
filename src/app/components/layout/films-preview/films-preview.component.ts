import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCompareModule } from 'primeng/imagecompare';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Knob } from 'primeng/knob';
import { Select } from 'primeng/select';

interface Film {
    label: string;
    value: string;
}

type Place = 'exterior' | 'interior' | 'cozinha' | 'escritorio';

@Component({
  selector: 'app-films-preview',
  standalone: true,
  imports: [ImageCompareModule, SelectButtonModule, FormsModule, Select, Knob],
  templateUrl: './films-preview.component.html',
  styleUrl: './films-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsPreviewComponent {
  selectOptions: any[] = [{ label: 'Interior', value: 'interior' },{ label: 'Exterior', value: 'exterior' }];
  knobValue: number = 0;
  films: Film[] = [
    { label: 'Tonalidades (G)', value: 'g' },
    { label: 'Espelhado', value: 'espelhado' },
    { label: 'Jateado Fosco', value: 'jateado-fosco' },
    { label: 'Jateado Leitoso', value: 'jateado-leitoso' },
    { label: 'Blackout', value: 'blackout' },
  ];
  selectedFilm: Film | undefined = undefined;

  currentLocation: Place = 'interior';

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
      "interior": "images/interior.png",
      "exterior": "images/exterior.png",
      "cozinha": "images/cozinha.png",
      "escritorio": "images/escritorio.png"
    },
    right: {
      "interior": {
        "espelhado": "images/interior-50.png"
      },
      "exterior": {
        "espelhado": "images/exterior-espelhado.png"
      },
      "cozinha": 'images/cozinha-jateado-branco.png',
      "escritorio": 'images/escritorio-jateado-fosco.png'
    }
  }

  get leftImageUrl(): string {
    return this.imagesUrl.left[this.currentLocation];
  }

  get rightImageUrl(): string {
    if(this.currentLocation === 'cozinha') {
      return this.imagesUrl.right.cozinha;
    } else if(this.currentLocation === 'escritorio') {
      return this.imagesUrl.right.escritorio;
    }

    const key = (this.imagesUrl.right[this.currentLocation] as { [key: string]: string })

    return key[this.selectedFilm?.value || 'espelhado'];
  }


  onFilmChange(film: Film) {
    if (film.value === 'jateado-fosco') {
      this.currentLocation = 'escritorio';
    } else if (film.value === 'jateado-leitoso') {
      this.currentLocation = 'cozinha';
    } else {
      this.currentLocation = 'exterior';
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
