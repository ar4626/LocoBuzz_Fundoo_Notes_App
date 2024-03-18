import { Component, Inject } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/note/note.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


@Component({
  selector: 'app-update-notes',
  standalone: true,
  imports: [
    IconsComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    // NgModel,
  ],
  templateUrl: './update-notes.component.html',
  styleUrl: './update-notes.component.scss'
})
export class UpdateNotesComponent {
  adjustTextAreaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = (textarea.scrollHeight + 2) + 'px'; // Set the height based on the content
  }

  title:any;
  description: any;
  id:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogbox : MatDialogRef<UpdateNotesComponent>,
    private notes:NoteService,
    private _snackBar: MatSnackBar,

  ){
    this.title = data.title,
    this.description = data.description,
    this.id = data.noteId
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  saveEdit(){
    let reqData = {
      title : this.title,
      description : this.description,
    }
    this.notes.updateNotes(reqData, this.id).subscribe(
      (response:any)=>{
        //Handle success response
        console.log("Note Updated successfuliy", response.data);
        this.openSnackBar('Note Updated.')
        this.dialogbox.close();
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
