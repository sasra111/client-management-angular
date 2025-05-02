import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component'; 
import { ClientTableComponent } from './client-table/client-table.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientFormComponent, ClientTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-18-primeng-app';
}

