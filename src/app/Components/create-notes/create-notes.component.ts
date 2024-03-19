import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/note/note.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
// import { DisplayNotesComponent } from '../display-notes/display-notes.component';

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
  submitted: boolean = false;
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

  notesForm  !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notes: NoteService,
    private _snackBar: MatSnackBar,
    // private displayNotesComponet: DisplayNotesComponent,

  ){}

  ngOnInit(): void { 
    this.notesForm = this.formBuilder.group(
      {
        title: ['',[Validators.required]],
        desc:['',[Validators.required]]
      }
    )
  }

  onSubmit(){
    this.submitted = true;
    if(this.notesForm.valid){
      let reqData = {
        title : this.notesForm.value.title,
        description : this.notesForm.value.desc,
      }

      console.log(reqData);

      this.notes.addNotes(reqData).subscribe(
        (response:any)=>{
          //Handle success response
          console.log("Note Created successfuliy", response.data);
          this.openSnackBar('Note created.')
          // this.displayNotesComponet.display();
        }, 
        (error: any)=>{
          console.log('Request Failed', error);
          this.openSnackBar('Request Failed') 
        }
      )
    }
    this.display=!this.display; 
  }

  openSnackBar(snackMessage: string) {
    // console.log("Open Snack Bar")
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: snackMessage,
      duration: 5 * 500,
    });
  }


}
