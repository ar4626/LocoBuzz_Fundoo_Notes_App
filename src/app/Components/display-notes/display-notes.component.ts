import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder } from '@angular/forms';
import { NoteService } from '../../services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-display-notes',
  standalone: true,
  imports: [
    MatCardModule,
    IconsComponent,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './display-notes.component.html',
  styleUrl: './display-notes.component.scss'
})
export class DisplayNotesComponent {
  isChecked: boolean = false;
  noteList: any[] = []; 

  constructor(
    private notes: NoteService,
    private _snackBar: MatSnackBar,
  ){}
  
  ngOnInit(): void {
    this.display();
  }
  
  toggleChecked(): void {
    this.isChecked = !this.isChecked;
  }
  display(): any {
    this.notes.getNotes().subscribe(
      (response:any)=>{
        //Handle success response
        this.noteList = response.data;
        console.log(this.noteList);
        console.log("Note Fetched successfuliy");
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
