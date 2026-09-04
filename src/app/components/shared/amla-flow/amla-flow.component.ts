import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amla-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amla-flow.component.html',
  styleUrls: ['./amla-flow.component.css']
})
export class AmlaFlowComponent {
  items = [
    { letter: 'A', term: 'Aggregator', desc: 'Of people, information, and local support infrastructure.' },
    { letter: 'M', term: 'Market Linked', desc: 'Connecting student caliber with societal needs.' },
    { letter: 'LA', term: 'Linking / Adding Value', desc: 'Bridging supply (students) with demand (industries).' }
  ];
}
