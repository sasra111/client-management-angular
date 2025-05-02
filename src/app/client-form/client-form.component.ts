import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() selectedClient: Client | null = null;
  @Input() selectedIndex: number | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();
  @Output() clientAdded = new EventEmitter<Client>();
  isEditMode = false;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedClient'] && this.selectedClient) {
      this.isEditMode = true;
      this.clientForm.patchValue(this.selectedClient);
    }
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
    if (this.isEditMode && this.selectedIndex !== null) {
      this.clientService.updateClient(this.selectedIndex, client);
    } else {
      this.clientService.addClient(client);
    }
    this.resetForm();
    this.formSubmitted.emit();
    this.messageService.add({
      severity: 'success',
      summary: 'Client Added',
      detail: 'Client saved successfully!',
    });
  }

  onCancel(): void {
    this.resetForm();
    this.editCancelled.emit();
  }

  private resetForm(): void {
    this.clientForm.reset();
    this.isEditMode = false;
    this.selectedClient = null;
    this.selectedIndex = null;
  }

  get f() {
    return this.clientForm.controls;
  }
}
