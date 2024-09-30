// // angular import
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   // public props
//   title = 'mantis-free-version';
// }
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api'; // Import the MessageService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService] // Provide the MessageService here
})
export class AppComponent {
  // Public properties
  title = 'mantis-free-version';

  // Inject MessageService in the constructor
  constructor(private messageService: MessageService) {}

  // Method to show a success toast
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your operation was successful!'
    });
  }

  // Method to show an error toast
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'There was an error processing your request.'
    });
  }
}
