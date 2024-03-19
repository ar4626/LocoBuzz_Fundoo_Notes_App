import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Router, RouterModule } from '@angular/router'; // Assuming Router is imported from Angular Router, not Express

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule, 
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  showPassword : boolean = false;

  toggleVisibility(): void{
    this.showPassword = !this.showPassword;

  }

  loginForm !: FormGroup;
  constructor(
    private formBuilder :FormBuilder,
    private userService :UserService,
    private _snackBar: MatSnackBar,
    private route: Router
    ){  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.formBuilder.group(
      {
        email: ['',[Validators.required,Validators.email]],
        password :['',[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]]
      }
    )
    
  }

  //API Integration 
  loginUser(): void{
    // if(this.loginForm.valid){
      const requestData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      // Call the login method from UserService
      this.userService.login(requestData).subscribe(
        (response: any)=>{
          //Handle success Response
          console.log("Login successful", response.data);
          localStorage.setItem('token', response.data);
          this.openSnackBar('Login successful')
          this.route.navigateByUrl('/home')
          
          //set timmer
          setTimeout(() => {
            this.deleteToken();
          }, 10 * 60 * 1000); // 10 minutes in milliseconds
        }, 
        (error)=>{
          console.log('Login Failed', error);
          this.openSnackBar('Login Failed') 
        }
      )
    // }
  }

  openSnackBar(snackMessage: string) {
    // console.log("Open Snack Bar")
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: snackMessage,
      duration: this.durationInSeconds * 500,
    });
  }

  // Function to delete token from local storage
  deleteToken(): void {
    localStorage.removeItem('token');
  }

}
