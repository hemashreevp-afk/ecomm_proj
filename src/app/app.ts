import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header} from './header/header'; // Import the class
import { HttpClient } from '@angular/common/http';
import { Seller } from './services/seller'; // Import the Seller service


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterModule,Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})

export class App {
  protected readonly title = signal('ecomm_proj');
constructor() {}
}
