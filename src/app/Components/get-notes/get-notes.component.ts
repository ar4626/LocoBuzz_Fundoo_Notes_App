import { Component } from '@angular/core';
import { CreateNotesComponent } from '../create-notes/create-notes.component';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';


@Component({
  selector: 'app-get-notes',
  standalone: true,
  imports: [
    CreateNotesComponent,
    DisplayNotesComponent
  ],
  templateUrl: './get-notes.component.html',
  styleUrl: './get-notes.component.scss'
})
export class GetNotesComponent {

}
 