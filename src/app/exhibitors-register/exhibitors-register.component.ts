import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { RegistrationCompletedPopup } from '../registration-completed-popup/registration-completed-popup.component';

@Component({
  selector: 'app-exhibitors-register',
  templateUrl: './exhibitors-register.component.html',
  styleUrls: ['./exhibitors-register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RegistrationCompletedPopup],
})
export class ExhibitorsRegisterComponent {
  @Input() selectedEvent!: string;
  @Input() selectedCompany!: string;

  exhibitorCards: any[] = [
    {
      emailAddress: '',
      nameOnBadge: '',
      jobTitle: '',
      country: '',
      companyOnBadge: '',
      errorMessage: '',
      emailError: false, // Email error flag
      companyError: false, // Company error flag
    },
  ];

  countries: string[] = [];
  isSubmitting: boolean = false; // For progress indicator
  isRegistrationCompleted: boolean = false; // Track if registration is completed
  uniqueCode: string = ''; // Store the unique code
  errorMessages: string[] = []; // Array to store error messages for failed submissions
  dropdownOpen: boolean = false;

  constructor(private http: HttpClient) {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<any>('/country').subscribe(
      (response) => {
        const countrySet = new Set<string>(
          response.map((item: any) => item.country)
        );
        this.countries = Array.from(countrySet);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  // Add new exhibitor card
  addCard() {
    if (this.exhibitorCards.length < 10) {
      this.exhibitorCards.push({
        emailAddress: '',
        nameOnBadge: '',
        jobTitle: '',
        country: '',
        companyOnBadge: this.selectedCompany, // Default to selected company
        errorMessage: '',
        emailError: false, // Initialize emailError flag
        companyError: false, // Initialize companyError flag
      });
    }
  }

  // Remove an exhibitor card
  removeCard(index: number) {
    this.exhibitorCards.splice(index, 1);
  }

  // Validate email address
  validateEmail(card: any) {
    card.emailError = !this.isValidEmail(card.emailAddress);
  }

  // Validate company name
  validateCompany(card: any) {
    card.companyError = card.companyOnBadge !== this.selectedCompany;
  }

  // Check if the email address is valid
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Validate form inputs
  validateForm() {
    return this.exhibitorCards.every(
      (card) =>
        card.emailAddress &&
        card.nameOnBadge &&
        card.jobTitle &&
        card.country &&
        !card.emailError && // Ensure email is valid
        !card.companyError && // Ensure company is valid
        card.companyOnBadge === this.selectedCompany // Validate company name
    );
  }

  // Register the exhibitors
  register() {
    if (this.exhibitorCards.length === 0 || !this.validateForm()) {
      alert('Please ensure all fields are filled correctly.');
      return;
    }

    this.isSubmitting = true; // Show progress indicator
    this.isRegistrationCompleted = false; // Hide popup initially
    this.errorMessages = []; // Reset error messages

    let successCount = 0;
    let failureCount = 0;

    this.exhibitorCards.forEach((card, index) => {
      const payload = {
        S_added_via: 'Web Form',
        S_company: this.selectedCompany,
        S_email_address: card.emailAddress,
        S_group_reg_id: this.generateRandomCode(),
        S_name_on_badge: card.nameOnBadge,
        S_job_title: card.jobTitle,
        S_country: card.country,
        S_company_on_badge: this.selectedCompany,
        SB_event_fha: this.selectedEvent === 'FHA-Food & Beverage',
        SB_event_prowine: this.selectedEvent === 'Prowine Singapore',
      };

      this.http
        .post(
          'https://staging-fha-2024.occamlab.com.sg/api/add-exhibitor',
          payload,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          }
        )
        .subscribe(
          (response) => {
            console.log('Success:', response);
            card.errorMessage = ''; // Clear any error message on success
            successCount++;
            if (index === this.exhibitorCards.length - 1) {
              this.isSubmitting = false; // Hide progress indicator after last submission
              this.uniqueCode = payload.S_group_reg_id; // Store the unique code
              this.isRegistrationCompleted = true; // Show the popup
            }
          },
          (error) => {
            console.error('Error:', error);
            // If the company does not exist in the API, show the error message
            if (error.error.message) {
              card.errorMessage = error.error.message;
            } else {
              card.errorMessage = 'An error occurred';
            }
            failureCount++;
            this.errorMessages.push(
              `Failed to submit entry for ${card.nameOnBadge}`
            );
            if (index === this.exhibitorCards.length - 1) {
              this.isSubmitting = false; // Hide progress indicator after last submission
            }
          }
        );
    });

    // If there are failed submissions, show the error message at the top
    if (failureCount > 0) {
      alert(
        `${failureCount} out of ${this.exhibitorCards.length} submissions have failed. To view your badge collection code, you may edit or remove your entries (For failed entries), and click Register.`
      );
    }
  }

  // Generate a random 5-letter code
  generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Toggle country dropdown
  toggleDropdown(card: any) {
    card.dropdownOpen = !card.dropdownOpen;
  }

  // Select country from dropdown
  onCountrySelect(country: string, card: any) {
    card.country = country;
    card.dropdownOpen = false;
  }
}
