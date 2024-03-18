import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
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
  selector: 'app-icons',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  public data : any;
  @Input() id:any;

  constructor(
    private notes : NoteService,
    private _snackBar: MatSnackBar,
  ){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }

  moveToArchive(noteId:any){
    console.log(noteId);
    this.notes.isArchive(noteId).subscribe(
      (response:any)=>{
        //Handle success response
        console.log("Note Moved to Archive", response);
        this.openSnackBar('Archived')
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
