import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../popupEditar/popupEditar.component';
import { TareasService } from '../../service/servicio-tareas.service';
import { Tarea } from '../../Interfaces/tarea';
import { ToastrService } from 'ngx-toastr';
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
  public tareas: Tarea[] = [];
  private todasLasTareas: Tarea[] = [];
  public isPopupVisible = false;
  public tareaSeleccionada: Tarea | null = null;
  public botonesVisibles: boolean = true;
  public estadoTarea: string = 'Activa';
  public tituloBusqueda: string = "activas";

  constructor(private _servicoTareas: TareasService, private toastr: ToastrService) { }

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
    this.tituloBusqueda = "activas";
  }

  public listarTareasFinalizadas(): void {
    this.tareas = this.todasLasTareas.filter((tarea) => tarea.estadoFinalizado);
    this.tituloBusqueda = "finalizadas";
  }

  public listarTareasEliminadas(): void {
    this.tareas = this.todasLasTareas.filter((tarea) => tarea.estadoEliminado);
    this.tituloBusqueda = "eliminadas";
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
        this.toastr.success('Tarea actualizada correctamente.');
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
        this.toastr.success('Tarea eliminada correctamente.');
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
        this.toastr.success('Tarea finalizada correctamente');
      },
      (error) => {
        console.error('Error al finalizar la tarea:', error);
      }
    );
  }
}
