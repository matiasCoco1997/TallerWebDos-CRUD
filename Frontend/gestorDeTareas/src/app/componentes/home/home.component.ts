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
  public tituloPagina: string = "Listado de tareas";

  private tareasBDD: Tarea[] = [
    { id: 1, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
    { id: 2, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: false, estadoFinalizado: false },
    { id: 3, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: false },
    { id: 4, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: false, estadoFinalizado: false },
    { id: 5, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: false },
    { id: 6, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: true },
    { id: 7, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Baja", estadoEliminado: false, estadoFinalizado: true },
    { id: 8, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Media", estadoEliminado: true, estadoFinalizado: false },
    { id: 9, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: true, estadoFinalizado: false },
    { id: 10, titulo: 'Título tarea', descripcion: 'Descripción tarea', prioridad: "Alta", estadoEliminado: false, estadoFinalizado: false },
  ];

  public tareas: Tarea[] = [];

  public isPopupVisible = false;

  public tareaSeleccionada: Tarea | null = null;
  public tituloPopUp!: string;
  public botonesVisibles: boolean = true;
  public estadoTarea: string = "";


  ngOnInit(): void {
    //aca hay que cargarle la lista de tareas del back
    this.listarTareasActivas();
  }

  public togglePopupEditar(id: number) {
    const tareaEncontrada = this.tareas.find(tarea => tarea.id === id);

    if (tareaEncontrada && tareaEncontrada.estadoEliminado == false && tareaEncontrada.estadoFinalizado == false) {
      this.tareaSeleccionada = tareaEncontrada;
      this.isPopupVisible = !this.isPopupVisible;
    }
  }

  public listarTareasActivas() {
    let tareasActivas: Tarea[] = [];
    this.tareasBDD.forEach(tarea => {
      if (!tarea.estadoEliminado && !this.tareaSeleccionada?.estadoFinalizado) {
        tareasActivas.push(tarea);
      }
    });
    this.tareas = tareasActivas;
  }

  public listarTareasFinalizadas() {
    let tareasFinalizadas: Tarea[] = [];

    this.tareasBDD.forEach(tarea => {
      if (tarea.estadoEliminado == false && tarea.estadoFinalizado == true) {
        tareasFinalizadas.push(tarea);
      }
    });
    this.tareas = tareasFinalizadas;
  }

  public listarTareasEliminadas() {
    let tareasEliminadas: Tarea[] = [];
    this.tareasBDD.forEach(tarea => {
      console.log();
      if (tarea.estadoEliminado == true && tarea.estadoFinalizado == false) {
        tareasEliminadas.push(tarea);
      }
    });
    console.log(tareasEliminadas);
    this.tareas = tareasEliminadas;
  }

  public onSelectionChange(event: Event): void {
    const opcionSeleccionada = (event.target as HTMLSelectElement).value;
    switch (opcionSeleccionada) {
      case "finalizadas":
        this.listarTareasFinalizadas();
        this.botonesVisibles = false;
        this.estadoTarea = "Finalizada";
        break;

      case "eliminadas":
        this.listarTareasEliminadas();
        this.botonesVisibles = false;
        this.estadoTarea = "Eliminada";
        break;

      default:
        this.listarTareasActivas();
        this.botonesVisibles = true;
        break;
    }
  }

}
