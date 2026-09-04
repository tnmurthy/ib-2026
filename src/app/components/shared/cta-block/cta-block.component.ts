import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-block',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cta-block.component.html',
  styleUrls: ['./cta-block.component.css']
})
export class CtaBlockComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() primaryText: string = 'Get Started';
  @Input() primaryLink: string = '/contact';
  @Input() secondaryText: string = '';
  @Input() secondaryLink: string = '';
  @Input() variant: 'standard' | 'emphasized' | 'dark' = 'standard';
}
