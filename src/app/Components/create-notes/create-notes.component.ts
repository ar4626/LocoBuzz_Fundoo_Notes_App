import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    IconsComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.scss'
})
export class CreateNotesComponent {
  noteText: string = '';

  display: boolean = true;

  adjustTextAreaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = (textarea.scrollHeight + 2) + 'px'; // Set the height based on the content
  }

  // toggleDisplay() {
  //   if (!this.display) {
  //     this.display = true;
  //   }
  // }
}
