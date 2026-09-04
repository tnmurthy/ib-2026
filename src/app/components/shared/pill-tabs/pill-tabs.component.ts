import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-pill-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pill-tabs.component.html',
  styleUrls: ['./pill-tabs.component.css']
})
export class PillTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId: string = '';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(id: string) {
    this.tabChange.emit(id);
  }
}
