import { Component, EventEmitter, Input } from '@angular/core';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { NoteService } from '../../services/note/note.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [
    DisplayNotesComponent,
    MatCardModule,
    IconsComponent,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent {
  noteArray: any;
  isChecked: boolean = false;

  constructor(
    private notes: NoteService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.display();
  }

  toggleChecked(): void {
    this.isChecked = !this.isChecked;
  }

  display(): any {
    this.notes.getNotes().subscribe(
      (response: any) => {
        //Handle success response
        this.noteArray = response.data;
        console.log(this.noteArray);
        console.log("Note Fetched successfuliy");

        // Filter out notes with trash property set to true
        this.noteArray = this.noteArray.filter((note: any) => note.isTrash == true);
        console.log("Filtered Note Array:");
        console.log(this.noteArray);


        this.noteArray.reverse();
        this.openSnackBar('Note Fetched.')
      },
      (error: any) => {
        console.log('Request Failed', error);
        this.openSnackBar('Request Failed')
      }
    )
  }

  restoreNotes(noteId: any) {
    this.notes.isTrash(noteId).subscribe(
      (response: any) => {
        //Handle success response
        console.log("Note Moved to Notes", response);
        this.display();
        this.openSnackBar('Untrashed')
      },
      (error: any) => {
        console.log('Request Failed', error);
        this.openSnackBar('Request Failed')
      }
    )
  }

  deleteNotes(noteId: any) {
    this.notes.deleteNote(noteId).subscribe(
      (response: any) => {
        //Handle success response
        console.log("Note Deleted", response);
        this.display();
        this.openSnackBar('Deleted')
      },
      (error: any) => {
        console.log('Request Failed', error);
        this.openSnackBar('Request Failed')
      }
    )
  }

  emptyTrash() {
    this.notes.emptyTrash().subscribe(
      (response: any) => {
        //Handle success response
        console.log("Trash Cleared", response);
        this.display();
        this.openSnackBar('Trash Cleared');
      },
      (error: any) => {
        console.log('Request Failed', error);
        this.openSnackBar('Request Failed')
      }
    )
  }

  openSnackBar(snackMessage: string) {
    // console.log("Open Snack Bar")
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: snackMessage,
      duration: 5 * 500,
    });
  }

}
