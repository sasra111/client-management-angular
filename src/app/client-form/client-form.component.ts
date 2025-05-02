import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client.model';
import { CommonModule } from '@angular/common';
import { ClientService } from '../services/client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    SelectModule,
    InputTextModule,
    CheckboxModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent {
  @Output() clientAdded = new EventEmitter<Client>();
  clientForm: FormGroup;
  clientTypes = ['Individual', 'Business'];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private messageService: MessageService
  ) {
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
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Input',
        detail: 'Please fix the form errors',
      });
      return;
    }
    const client: Client = this.clientForm.value;
    this.clientService.addClient(client);
    this.messageService.add({
      severity: 'success',
      summary: 'Client Added',
      detail: 'Client saved successfully!',
    });
    this.clientForm.reset();
  }

  get f() {
    return this.clientForm.controls;
  }
}
