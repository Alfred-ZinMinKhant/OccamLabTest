import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-registration-completed-popup',
  templateUrl: './registration-completed-popup.component.html',
  styleUrls: ['./registration-completed-popup.component.scss'],
})
export class RegistrationCompletedPopup {
  @Input() uniqueCode!: string;

  saveAsImage() {
    // Call the save as image functionality from html2canvas
    html2canvas(document.querySelector('.popup-card')!).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'registration_completed.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  backToHome() {
    // Refresh the page
    window.location.reload();
  }
}
