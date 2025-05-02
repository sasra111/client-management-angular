import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component'; 
import { ClientTableComponent } from './client-table/client-table.component';
import { Toast} from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientFormComponent, ClientTableComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  title = 'angular-18-primeng-app';

}

