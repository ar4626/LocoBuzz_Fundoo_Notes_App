import { Component, Input } from '@angular/core';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NoteService } from '../../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    DisplayNotesComponent,
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent {
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
        this.noteArray = this.noteArray.filter((note: any) => note.isArchive==true);
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



}
