import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  details: string = 'details';

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registerForm = this.formBuilder.group(
      {
        fname: ["", [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
        lname: ["", [Validators.required, Validators.pattern('^[A-Z][a-z]*$')]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
        confirmPassword: ["", [Validators.required]],
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
