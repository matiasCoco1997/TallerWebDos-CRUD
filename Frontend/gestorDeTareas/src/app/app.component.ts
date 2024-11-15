import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CrearTareaViewComponent } from "./componentes/crear-tarea-view/crear-tarea-view.component";
import { PopupComponent } from './componentes/popupEditar/popupEditar.component';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    CrearTareaViewComponent,
    PopupComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestorDeTareas';
}
