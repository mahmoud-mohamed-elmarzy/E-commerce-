import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-support', // الاسم الجديد
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css',
})
export class SupportComponent {
  isLoading = signal<boolean>(false);
  showSuccessMessage = signal<boolean>(false);

  supportForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('General Inquiry'),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  handleFormSubmit(): void {
    if (this.supportForm.valid) {
      this.isLoading.set(true);

      setTimeout(() => {
        this.isLoading.set(false);
        this.showSuccessMessage.set(true);
        this.supportForm.reset({ subject: 'General Inquiry' });


        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 3000);
      }, 1500);
    } else {
      this.supportForm.markAllAsTouched();
    }
  }
}
