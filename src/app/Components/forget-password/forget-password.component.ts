import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackbar: MatSnackBar,
  ) { };


  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }
    )
  }

  forgetPassword(): void {
    if (this.forgetPasswordForm.valid) {
      const requestData = {
        email: this.forgetPasswordForm.value.email
      };
      console.log(requestData);
      this.userService.forgetPassword(requestData).subscribe(
        (response: any) => {
          //Handle success response
          console.log(response.message);
          this.openSnackBar(response.message);
        },
        (error: any) => {
          console.log("Email sending error: " + error.message);
          this.openSnackBar("Email doesn't exist.");
        }
      )
    }
  }

  openSnackBar(snackMessage: string) {
    // console.log("Open Snack Bar")
    this._snackbar.openFromComponent(SnackBarComponent, {
      data: snackMessage,
      duration: 2500,
    });
  }

}
