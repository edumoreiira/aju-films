import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCompareModule } from 'primeng/imagecompare';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Select } from 'primeng/select';

interface Film {
    label: string;
    value: string;
}

@Component({
  selector: 'app-films-preview',
  standalone: true,
  imports: [ImageCompareModule, SelectButtonModule, FormsModule, Select],
  templateUrl: './films-preview.component.html',
  styleUrl: './films-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmsPreviewComponent {
  stateOptions: any[] = [{ label: 'Interior', value: 'interior' },{ label: 'Exterior', value: 'exterior' }];
  value: string = 'interior';

  films: Film[] = [
    { label: 'Modelo xyz', value: 'film1' },
    { label: 'Modelo xyz', value: 'film2' },
    { label: 'Modelo xyz', value: 'film3' }
  ];
  selectedFilm: Film | undefined = undefined;

}
