import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-display-notes',
  standalone: true,
  imports: [
    MatCardModule,
    IconsComponent,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './display-notes.component.html',
  styleUrl: './display-notes.component.scss'
})
export class DisplayNotesComponent {
  isChecked: boolean = false;

  toggleChecked(): void {
    this.isChecked = !this.isChecked;
  }
}
