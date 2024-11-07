import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../Interfaces/tarea';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';

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
    { id: 1, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta" },
    { id: 2, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media" },
    { id: 3, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja" },
    { id: 4, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media" },
    { id: 5, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja" },
    { id: 6, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta" },
    { id: 7, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja" },
    { id: 8, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media" },
    { id: 9, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta" },
    { id: 10, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta" },
  ];

  public isPopupVisible = false;

  public tareaSeleccionada: Tarea | null = null;
  public tituloPopUp!: string;

  public togglePopup(id: number) {
    const tareaEncontrada = this.tareas.find(tarea => tarea.id === id);

    if (tareaEncontrada) {
      this.tareaSeleccionada = tareaEncontrada;
      this.isPopupVisible = !this.isPopupVisible;
    }
  }

}
