import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBlockComponent } from '../../components/shared/hero-block/hero-block.component';

@Component({
  selector: 'app-collaborate',
  standalone: true,
  imports: [CommonModule, HeroBlockComponent],
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.css']
})
export class CollaborateComponent {}
