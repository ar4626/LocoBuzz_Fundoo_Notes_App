import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-review',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './final-review.component.html',
  styleUrl: './final-review.component.scss'
})
export class FinalReviewComponent {
  items = [
    { name: 'Item 1', description: 'Description for item 1' },
    { name: 'Item 2', description: 'Description for item 2' },
    { name: 'Item 3', description: 'Description for item 3' },
    { name: 'Item 1', description: 'Description for item 1' },
    { name: 'Item 2', description: 'Description for item 2' },
    { name: 'Item 3', description: 'Description for item 3' },
    { name: 'Item 1', description: 'Description for item 1' },
  ];
}
