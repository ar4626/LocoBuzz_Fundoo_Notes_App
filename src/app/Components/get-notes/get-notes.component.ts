import { Component } from '@angular/core';
import { CreateNotesComponent } from '../create-notes/create-notes.component';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NoteService } from '../../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


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

  noteArray: any; 

  constructor(
    private notes: NoteService,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.display();
  }

  display(): any {
    this.notes.getNotes().subscribe(
      (response:any)=>{
        //Handle success response
        this.noteArray = response.data;
        console.log(this.noteArray);
        console.log("Note Fetched successfuliy");
        
        // Filter out notes with trash property set to true
        this.noteArray = this.noteArray.filter((note: any) => note.isTrash==false && note.isArchive==false);
        console.log("Filtered Note Array:");
        console.log(this.noteArray);

        
        this.noteArray.reverse();
        this.openSnackBar('Note Fetched.')
      }, 
      (error: any)=>{
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

  displayAddedNotes($event: any) {
    console.log('Create to get all Notes' + $event)
    this.display();
  }

  displayUpatedNotes($event: any) {
    console.log('Create to get all Notes' + $event)
    this.display();
  }

  

}
 