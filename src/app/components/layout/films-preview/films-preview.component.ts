import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCompareModule } from 'primeng/imagecompare';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Knob } from 'primeng/knob';
import { Select } from 'primeng/select';
import { NgClass } from '@angular/common';
import { createAnimation } from '../../../animations/transitions.animation';
import { DocumentListenerService } from '../../../services/document-listener.service';
import { IMAGES_PREVIEW_URL } from '../../../../../assets/static-data';

interface Film {
    label: string;
    value: string;
}

type Place = 'exterior' | 'interior' | 'cozinha' | 'escritorio' | 'playground';

interface InteriorExteriorImages {
  espelhado: string;
  blackout: string;
  transparente_termica: string;
  G5: string;
  G20: string;
  G35: string;
  G50: string;
}

interface RightImageLocations {
  interior: InteriorExteriorImages;
  exterior: InteriorExteriorImages;
  cozinha: string;
  escritorio: string;
  playground: string;
}

interface ImageUrls {
  left: Record<Place, string>;
  right: RightImageLocations;
}

@Component({
  selector: 'app-films-preview',
  standalone: true,
  imports: [ImageCompareModule, SelectButtonModule, FormsModule, Select, Knob, NgClass],
  templateUrl: './films-preview.component.html',
  styleUrl: './films-preview.component.scss',
  animations: [
    createAnimation('instructionsPopUp', { transform: 'translateX(-50%) translateY(50%) scale(1.2)' }),
    createAnimation('slideXY', { animateX: true, animateY: true, duration: '400ms' }),
    createAnimation('knobPopUp', { transform: 'scale(1.02) translateY(-20%)', duration: '400ms' }),
    createAnimation('knobPopUpMobile', { transform: 'translateX(-50%) translateY(-20%) scale(1.02)', duration: '400ms' })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsPreviewComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  protected documentListener = inject(DocumentListenerService);
  // signals
  knobValue = signal(0);
  userHasInteracted = signal(false);
  selectedFilm = signal<Film | undefined>(undefined);
  currentLocation = signal<Place>('cozinha');

  //static data
  readonly selectOptions: any[] = [{ label: 'Interno', value: 'interior' },{ label: 'Externo', value: 'exterior' }];
  readonly films: Film[] = [
    { label: 'Fumê', value: 'g' },
    { label: 'Espelhado', value: 'espelhado' },
    { label: 'Jateado Fosco', value: 'jateado_fosco' },
    { label: 'Branco Leitoso', value: 'jateado_leitoso' },
    { label: 'Blackout', value: 'blackout' },
    { label: 'Segurança', value: 'seguranca' },
    { label: 'Transparente Térmica', value: 'transparente_termica' }
  ];
  private readonly imagesUrl: ImageUrls = IMAGES_PREVIEW_URL;

  readonly knobLabel = computed<Film>(() =>  {
    switch(this.knobValue()) {
      case 0: return { label:'G-50', value: 'G50'};
      case 1: return { label:'G-35', value: 'G35'};
      case 2: return { label:'G-20', value: 'G20'};
      case 3: return { label:'G-5', value: 'G5'};
      default: return { label:'0', value: '0'};
    }
  });

  readonly leftImageUrl = computed(() => this.imagesUrl.left[this.currentLocation()]);

  readonly rightImageUrl = computed(() => {
    const location = this.currentLocation();
    const rightImages = this.imagesUrl.right;

    switch (location) { 
      case 'cozinha': return rightImages.cozinha;
      case 'escritorio': return rightImages.escritorio;
      case 'playground': return rightImages.playground;
    }

    // interior and exterior
    const filmImages = rightImages[location];
    const film = this.selectedFilm();

    // g family
    if (film?.value === 'g') {
      const gFilmKey = this.knobLabel().value as keyof InteriorExteriorImages;
      return filmImages[gFilmKey];
    }

    // others
    const filmKey = (film?.value || 'espelhado') as keyof InteriorExteriorImages;
    return filmImages[filmKey];

  })


  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const range = element.querySelector('.p-imagecompare-slider');
    this.renderer.listen(range, 'input', (event) => {
      const value = parseInt((event.target as HTMLInputElement).value);
      if (value >= 60 || value <= 40) { // Check if the user has interacted with the slider
        this.userHasInteracted.set(true);
      }
    });
  }


  protected onFilmChange(film: Film | undefined) {
    if(!film) return;

    this.userHasInteracted.set(false);
    switch (film.value) {
      case 'jateado_fosco':
        this.currentLocation.set('escritorio');
        break;
      case 'jateado_leitoso':
        this.currentLocation.set('cozinha');
        break;
      case 'seguranca':
        this.currentLocation.set('playground');
        break;
      default:
        this.currentLocation.set('exterior');
        break;
    }
  }

protected decrementKnobValue(): void {
  this.knobValue.update(v => v - 1);
}

protected incrementKnobValue(): void {
  this.knobValue.update(v => v + 1);
}

}
