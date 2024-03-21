import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';



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
  @Output() refreshUpdateNotes = new EventEmitter<string>();
  @Output() refreshNotes = new EventEmitter<string>();
  isChecked: boolean = false;
  @Input() noteList:any;
  

  constructor(
    private dialog : MatDialog,
  ){}
  
  toggleChecked(): void {
    this.isChecked = !this.isChecked;
  }

  editNoteDialog(notes: any){
    const dialogbox = this.dialog.open(UpdateNotesComponent,{
      data:notes
    })
    dialogbox.afterClosed().subscribe(
      (result)=>{
        console.log(result);
        this.refreshUpdateNotes.emit(result);
      }
    )
  }


  
}
