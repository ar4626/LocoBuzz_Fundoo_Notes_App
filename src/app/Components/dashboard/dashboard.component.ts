import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RegisterComponent } from '../register/register.component';
import { GetNotesComponent } from '../get-notes/get-notes.component';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
}) 
export class DashboardComponent {
  showFiller = false;

  switchbg() : void{
    this.showFiller=!this.showFiller;
  }
}
