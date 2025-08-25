import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageCompareModule } from 'primeng/imagecompare';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Knob } from 'primeng/knob';
import { Select } from 'primeng/select';

interface Film {
    label: string;
    value: string;
}

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
  selectValue: string = 'interior';
  knobValue: number = 0;

  films: Film[] = [
    { label: 'Modelo xyz', value: 'film1' },
    { label: 'Modelo xyz', value: 'film2' },
    { label: 'Modelo xyz', value: 'film3' }
  ];
  selectedFilm: Film | undefined = undefined;

}
