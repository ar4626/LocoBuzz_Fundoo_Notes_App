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
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  public data : any;
  colorBtn:boolean = false;
  @Input() id:any;
  colorOptions: any = [
    { value: '#faafa8', label: 'Coral' }, 
    { value: '#f39f76', label: 'Peach' }, 
    { value: '#fff8b8', label: 'Sand' }, 
    { value: '#e2f6d3', label: 'Mint' },
    { value: '#b4ddd3', label: 'Sage' }, 
    { value: '#d4e4ed', label: 'Fog' }, 
    { value: '#aeccdc', label: 'Storm' }, 
    { value: '#d3bfdb', label: 'Dusk' }, 
    { value: '#f6e2dd', label: 'Blossom' },
    { value: '#e9e3d4', label: 'Clay' }, 
  ];

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

  moveToTrash(noteId:any){
    console.log(noteId);
    this.notes.isTrash(noteId).subscribe(
      (response:any)=>{
        //Handle success response
        console.log("Note Moved to Trash", response);
        this.openSnackBar('Trashed')
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
