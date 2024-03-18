import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard  } from './AuthGuard/authgaurd.guard';
import { CreateNotesComponent } from './Components/create-notes/create-notes.component';
import { IconsComponent } from './Components/icons/icons.component';
import { GetNotesComponent } from './Components/get-notes/get-notes.component';
import { DisplayNotesComponent } from './Components/display-notes/display-notes.component';
import { UpdateNotesComponent } from './Components/update-notes/update-notes.component';


export const routes: Routes = [
    {
        path: '', redirectTo: 'display', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent,
        
    },
    {
        path: 'register', component: RegisterComponent 
    },
    {
        path: 'reset/:id', component: ResetPasswordComponent
    },
    {
        path: 'forget-password', component: ForgetPasswordComponent
    },
    {
        path: 'create', component: CreateNotesComponent
    },
    {
        path: 'display', component: DisplayNotesComponent
    },
    {
        path: 'icon', component: IconsComponent
    },
    {
        path: 'update', component: UpdateNotesComponent
    },
    {
        path: 'home', component: DashboardComponent,
        canActivate:[AuthGuard],
        children:[
            {
                path: '', redirectTo: '/home/notes', pathMatch:'full'
            },
            {
                path: 'notes', component: GetNotesComponent
            }
        ]
    },

];
