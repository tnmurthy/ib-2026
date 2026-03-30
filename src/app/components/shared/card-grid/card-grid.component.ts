import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardItem {
  icon?: string;
  title: string;
  description: string;
  list?: string[];
}

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent {
  @Input() cards: CardItem[] = [];
  @Input() columns: number = 2;
  @Input() cardStyle: 'default' | 'accent' | 'outline' = 'default';
}
