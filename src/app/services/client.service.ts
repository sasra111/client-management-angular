// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly STORAGE_KEY = 'clients';
  private clients: Client[] = [];

  constructor() {
    this.loadFromStorage();
  }

  getClients(): Client[] {
    return this.clients;
  }

  addClient(client: Client): void {
    this.clients.push(client);
    this.saveToStorage();
  }

  updateClient(index: number, updatedClient: Client): void {
    this.clients[index] = updatedClient;
  }

  deleteClient(index: number): void {
    this.clients.splice(index, 1);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.clients));
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.clients = stored ? JSON.parse(stored) : [];
  }
}
