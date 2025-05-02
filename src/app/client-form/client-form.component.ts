import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent {
  @Output() clientAdded = new EventEmitter<Client>();
  clientForm: FormGroup;
  clientTypes = ['Individual', 'Business'];

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      clientType: [null, Validators.required],
      isActive: [false],
      bankBalance: [null, [Validators.required, Validators.min(0)]],
      outstandingLoan: [null, Validators.min(0)],
      registrationDate: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      this.clientService.addClient(client);
      this.clientForm.reset();
    }
  }
}
