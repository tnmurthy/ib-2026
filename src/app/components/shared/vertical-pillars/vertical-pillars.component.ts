import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vertical-pillars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vertical-pillars.component.html',
  styleUrls: ['./vertical-pillars.component.css']
})
export class VerticalPillarsComponent {
  @Input() leftTitle: string = '';
  @Input() leftDescription: string = '';
  @Input() rightContentTitle: string = '';
  @Input() rightContentDescription: string = '';
}
