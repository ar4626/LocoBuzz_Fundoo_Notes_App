import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  showPassword : boolean = false;

  toggleVisibility(): void{
    this.showPassword = !this.showPassword;
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
}
