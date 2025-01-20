import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-event-selection',
  templateUrl: './event-selection.component.html',
  styleUrls: ['./event-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class EventSelectionComponent {
  @Input() events: string[] = [];
  @Input() allCompanies: any[] = [];
  @Output() companySelected = new EventEmitter<string>();
  @Output() eventSelected = new EventEmitter<string>();

  selectedEvent: string = '';
  selectedCompany: string = '';
  filteredCompanies: string[] = [];
  dropdownOpen: boolean = false; // To track if the dropdown is open

  ngOnInit() {
    if (this.events && this.events.length > 0) {
      // Select the top event by default if events are available
      this.selectedEvent = this.events[0];
      this.filterCompanies();
    } else {
      console.error('No events available to select');
    }
  }

  onEventChange() {
    this.eventSelected.emit(this.selectedEvent);
    this.filterCompanies();
  }

  onCompanyChange() {
    this.companySelected.emit(this.selectedCompany);
  }

  filterCompanies() {
    if (this.allCompanies && this.allCompanies.length > 0) {
      this.filteredCompanies = this.allCompanies
        .filter((company: any) => company.S_event === this.selectedEvent)
        .map((company: any) => company.S_company);
    } else {
      console.error('No companies available for the selected event');
      this.filteredCompanies = [];
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen; // Toggle the dropdown state
  }

  onOptionSelect(company: string) {
    this.selectedCompany = company;
    this.companySelected.emit(this.selectedCompany);
    this.dropdownOpen = false; // Close the dropdown after selection
  }
}
