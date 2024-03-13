import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'register', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'reset-password', component: ResetPasswordComponent
    },
    {
        path: 'forget-password', component: ForgetPasswordComponent
    },

];
