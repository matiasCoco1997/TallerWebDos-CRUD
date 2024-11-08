import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CrearTareaViewComponent } from './componentes/crear-tarea-view/crear-tarea-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crearTarea', component: CrearTareaViewComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
