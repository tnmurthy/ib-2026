import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-step-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-flow.component.html',
  styleUrls: ['./step-flow.component.css']
})
export class StepFlowComponent {
  @Input() steps: StepItem[] = [];
  @Input() showConnector: boolean = true;
}
