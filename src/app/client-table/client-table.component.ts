import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Client } from '../models/client.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ClientService } from '../services/client.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
  providers: [],
})
export class ClientTableComponent {
  get clients(): Client[] {
    return this.clientService.getClients();
  }

  constructor(
    private clientService: ClientService,
    private messageService: MessageService
  ) {}

  onDelete(index: number): void {
    this.clientService.deleteClient(index);
    this.messageService.add({
      severity: 'success',
      summary: 'Client Deleted',
      detail: 'Client was removed successfully',
      life: 3000,
    });
    console.log('Delete called for index:', index);
  }

  rowsPerPageOptions = [5, 10, 20];
}
