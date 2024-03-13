import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  details: string = 'details';
  durationInSeconds = 5;

  toggleVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onMouseOver(label: string): void {
    this.details = label;
  }

  onMouseOut(): void {
    this.details = "details";
  }

  registerForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar

    ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registerForm = this.formBuilder.group(
      {
        fName: ["", [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
        lName: ["", [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
        email: ["", [Validators.required, Validators.email]],
        // password: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
        // confirmPassword: ["", [Validators.required]],
      }
    );
  }

  password = new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]);
  confirmPassword = new FormControl('', [Validators.required, this.passwordMatchValidator()]);

  // Define passwordMatchValidator as a method
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const matchingPassword = this.password.value;
      const confirmMatchingPassword = control.value;

      return matchingPassword === confirmMatchingPassword ? null : { passwordMismatch: true };
    };
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    if(this.password.hasError('minlength')){
      return 'At least 5 characters' ;
    }

    return this.password.hasError('pattern') ? 'Password must be valid' : '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must confirm your password';
    }

    return this.confirmPassword.hasError('passwordMismatch') ? 'Passwords do not match' : '';
  }


  //API Integration 
  registerUser(): void {
    console.log('Register button clicked');
    if (this.registerForm.valid) {
      const requestData = {
        fName: this.registerForm.get('fName')?.value,
        lName: this.registerForm.get('lName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.password?.value,
        // confirmPassword: this.registerForm.get('confirmPassword')?.value,
      };

      console.log(requestData);
      // Call the register method from UserService
      this.userService.register(requestData).subscribe(
        (response:any) => {
          // Handle success response
          console.log('Registration successful:', response.data);
          this.openSnackBar("Registration successful");
        },
        (error) => {
          // Handle error response
          console.error('Registration failed:', error);
          this.openSnackBar("Registration Failed");
        }
      );
    }
  }

  openSnackBar(snackMessage: string) {
    // console.log("Open Snack Bar")
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: snackMessage,
      duration: this.durationInSeconds * 1000,
    });
  }

}


  // confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const confirmPassword = control.get('confirmPassword');
  //   if (password?.value === confirmPassword?.value) {
  //     return {
  //       passwordMismatch: true
  //     }
  //   }
  //   return null;
  // }
