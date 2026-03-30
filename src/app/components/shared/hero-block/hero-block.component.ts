import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-block.component.html',
  styleUrls: ['./hero-block.component.css']
})
export class HeroBlockComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() align: 'left' | 'center' = 'center';
  @Input() background: 'light' | 'dark' | 'gradient' = 'light';
}
