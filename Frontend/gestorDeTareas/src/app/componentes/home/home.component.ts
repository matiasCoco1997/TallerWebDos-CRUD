import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../Interfaces/tarea';
import { PopupComponent } from '../popupEditar/popupEditar.component';
import { CommonModule } from '@angular/common';
import { CrearTareaViewComponent } from '../crear-tarea-view/crear-tarea-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopupComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    //aca hay que cargarle la lista de tareas del back
  }

  public tituloPagina: string = "Listado de tareas";

  public tareas: Tarea[] = [
    { id: 1, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
    { id: 2, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: false, estadoFinalizado: false },
    { id: 3, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: false },
    { id: 4, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: false, estadoFinalizado: false },
    { id: 5, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: false },
    { id: 6, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
    { id: 7, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: false },
    { id: 8, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: false, estadoFinalizado: false },
    { id: 9, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
    { id: 10, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
  ];

  public isPopupVisible = false;

  public tareaSeleccionada: Tarea | null = null;
  public tituloPopUp!: string;

  public togglePopupEditar(id: number) {
    const tareaEncontrada = this.tareas.find(tarea => tarea.id === id);

    if (tareaEncontrada && tareaEncontrada.estadoEliminado == false && tareaEncontrada.estadoFinalizado == false) {
      this.tareaSeleccionada = tareaEncontrada;
      this.isPopupVisible = !this.isPopupVisible;
    }
  }

}
