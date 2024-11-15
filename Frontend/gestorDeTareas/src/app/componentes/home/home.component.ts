import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PopupComponent } from '../popupEditar/popupEditar.component';
import { TareasService } from '../../service/servicio-tareas.service';
import { Tarea } from '../../Interfaces/tarea';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PopupComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tituloPagina: string = 'Listado de tareas';
  public tareas: Tarea[] = []; // Tareas a mostrar en pantalla
  private todasLasTareas: Tarea[] = []; // Todas las tareas desde el backend
  public isPopupVisible = false;
  public tareaSeleccionada: Tarea | null = null;
  public botonesVisibles: boolean = true;
  public estadoTarea: string = 'Activa';

  constructor(private _servicoTareas: TareasService) {}

  ngOnInit(): void {
    this.cargarTareas(); // Cargar todas las tareas y aplicar filtro inicial
  }

  private cargarTareas(): void {
    this._servicoTareas.traerTareas().subscribe(
      (tareas) => {
        this.todasLasTareas = tareas; // Guarda todas las tareas
        this.listarTareasActivas(); // Aplica filtro inicial de tareas activas
      },
      (error) => {
        console.error('Error al cargar tareas:', error);
      }
    );
  }

  public onSelectionChange(event: Event): void {
    const opcionSeleccionada = (event.target as HTMLSelectElement).value;
    switch (opcionSeleccionada) {
      case 'finalizadas':
        this.listarTareasFinalizadas();
        this.botonesVisibles = false;
        this.estadoTarea = 'Finalizada';
        break;

      case 'eliminadas':
        this.listarTareasEliminadas();
        this.botonesVisibles = false;
        this.estadoTarea = 'Eliminada';
        break;

      default:
        this.listarTareasActivas();
        this.botonesVisibles = true;
        this.estadoTarea = 'Activa';
        break;
    }
  }

  public listarTareasActivas(): void {
    this.tareas = this.todasLasTareas.filter(
      (tarea) => !tarea.estadoEliminado && !tarea.estadoFinalizado
    );
  }

  public listarTareasFinalizadas(): void {
    this.tareas = this.todasLasTareas.filter((tarea) => tarea.estadoFinalizado);
  }

  public listarTareasEliminadas(): void {
    this.tareas = this.todasLasTareas.filter((tarea) => tarea.estadoEliminado);
  }

  public togglePopupEditar(id: number): void {
    const tareaEncontrada = this.tareas.find((tarea) => tarea.id === id);
    if (tareaEncontrada) {
      this.tareaSeleccionada = tareaEncontrada;
      this.isPopupVisible = true;
    }
  }

  public actualizarTarea(tareaActualizada: Tarea): void {
    this._servicoTareas.editarTarea(tareaActualizada.id!, tareaActualizada).subscribe(
      () => {
        this.cargarTareas(); // Recarga las tareas
        this.isPopupVisible = false;
      },
      (error) => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

  public eliminarTarea(id: number): void {
    this._servicoTareas.eliminarTarea(id).subscribe(
      () => {
        this.cargarTareas();
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }

  public finalizarTarea(id: number): void {
    this._servicoTareas.finalizarTarea(id).subscribe(
      () => {
        this.cargarTareas();
      },
      (error) => {
        console.error('Error al finalizar la tarea:', error);
      }
    );
  }
}
