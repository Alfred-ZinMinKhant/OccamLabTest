import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
    <div class="banner">
      <img
        src="assets/images/FormPageBanner.png"
        alt="Banner"
        class="banner-image"
      />
    </div>

    <h1>Onsite Exhibitors Registration</h1>
  `,
  styles: [
    `
      .banner {
        width: 100%;
        text-align: center;
        overflow: hidden;
      }
      .banner-image {
        width: 100%; /* Make the image full-width */
        height: auto; /* Maintain aspect ratio */
        display: block; /* Remove extra spacing */
      }

      h1 {
        color: #ee4036;
        font-family: Montserrat;
        font-size: 24px;
        padding: 0 20px;
      }
    `,
  ],
  standalone: true,
})
export class BannerComponent {}
