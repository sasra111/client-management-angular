import { Component, Input,EventEmitter, Output } from '@angular/core';
import { Client } from '../models/client.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ClientService } from '../services/client.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule ], 
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
})
export class ClientTableComponent {
  get clients(): Client[] {
    return this.clientService.getClients();
  }

  constructor(private clientService: ClientService) {}

  onDelete(index: number): void {
    this.clientService.deleteClient(index);
  }

  rowsPerPageOptions = [5, 10, 20];
}
