import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RegisterComponent } from '../register/register.component';
import { GetNotesComponent } from '../get-notes/get-notes.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule, 
    RegisterComponent,
    GetNotesComponent,
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
}) 
export class DashboardComponent {
  showFiller = false;
  notes: boolean = true;
  trash: boolean = false;
  archive: boolean = false;

  constructor(
    private route : Router
  ){

  }

  switchbg() : void{
    this.showFiller=!this.showFiller;
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.route.navigateByUrl('/login');
  }
}
