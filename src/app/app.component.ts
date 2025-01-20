import { Component, OnInit } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { BannerComponent } from './banner/banner.component';
import { EventSelectionComponent } from './event-selection/event-selection.component';
import { ExhibitorsRegisterComponent } from './exhibitors-register/exhibitors-register.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-banner></app-banner>
      <app-event-selection
        [events]="events"
        (eventSelected)="onEventSelected($event)"
        [allCompanies]="allCompanies"
        (companySelected)="onCompanySelected($event)"
      ></app-event-selection>

      <!-- Only show the exhibitors register component when both event and company are selected -->
      <app-exhibitors-register
        *ngIf="selectedEvent && selectedCompany"
        [selectedEvent]="selectedEvent"
        [selectedCompany]="selectedCompany"
      ></app-exhibitors-register>
    </div>
  `,
  standalone: true,
  imports: [
    BannerComponent,
    EventSelectionComponent,
    ExhibitorsRegisterComponent,
    CommonModule, // Add CommonModule here
  ],
})
export class AppComponent implements OnInit {
  data: any;
  events: string[] = [];
  allCompanies: any[] = []; // Store all companies data
  selectedEvent: string = '';
  selectedCompany: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData().subscribe(
      (response) => {
        if (response && response.status && response.status === true) {
          this.data = response;
          this.processData();
        } else {
          console.error('API Error:', response.err_message || 'Unknown error');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchData(): Observable<any> {
    const url =
      'https://staging-fha-2024.occamlab.com.sg/api/exhibitor-company-list'; // The proxy will handle the CORS issue
    return this.http.post<any>(
      url,
      {},
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  processData() {
    if (this.data && Array.isArray(this.data.message)) {
      const eventsSet = new Set(
        this.data.message.map((item: any) => item.S_event)
      );
      this.events = Array.from(eventsSet) as string[]; // Extract event names
      this.allCompanies = this.data.message; // Store all company data
    } else {
      console.error('Invalid data structure:', this.data);
    }
  }

  onEventSelected(event: string) {
    this.selectedEvent = event;
  }

  onCompanySelected(company: string) {
    this.selectedCompany = company;
  }
}
