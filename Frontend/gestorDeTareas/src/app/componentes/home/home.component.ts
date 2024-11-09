import { Component, OnInit } from '@angular/core'; 
import { Tarea } from '../../Interfaces/tarea';
import { PopupComponent } from '../popupEditar/popupEditar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CrearTareaViewComponent } from '../crear-tarea-view/crear-tarea-view.component';
import { TareasService } from '../../service/servicio-tareas.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopupComponent, CommonModule,FormsModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public tituloPagina: string = 'Listado de tareas';
  public tareas: Tarea[] = [];
  public isPopupVisible = false;
  public tareaSeleccionada: Tarea | null = null;
  public tituloPopUp!: string;
  public botonesVisibles: boolean = true;
  public estadoTarea: string = '';
   // Variables enlazadas al formulario
   public titulo: string = '';
   public descripcion: string = '';
   public prioridad: string = 'Alta'; // Valor por defecto
  constructor(private _servicoTareas: TareasService) {} 

  ngOnInit(): void {
    this._servicoTareas.traerTareas().subscribe(
      (tareas) => {
        this.tareas = tareas; // Asigna las tareas obtenidas a la variable tareas
      },
      (error) => {
        console.error('Error al cargar tareas:', error); // Manejo de errores
      }
    ); 
  }
 

  public togglePopupEditar(id: number) {
    const tareaEncontrada = this.tareas.find((tarea) => tarea.id === id);

    if (
      tareaEncontrada
      //  &&
      // tareaEncontrada.estadoEliminado == false &&
      // tareaEncontrada.estadoFinalizado == false
    ) {
      this.tareaSeleccionada = tareaEncontrada;
      this.isPopupVisible = !this.isPopupVisible;

      this._servicoTareas.traerTareas().subscribe(
        (tareas) => {
          this.tareas = tareas; // Asigna las tareas obtenidas a la variable tareas
        },
        (error) => {
          console.error('Error al cargar tareas:', error); // Manejo de errores
        }
      ); 
    }
  }
  public onSubmit(): void {
    this.crearTareaDirectamente(this.titulo, this.descripcion, this.prioridad);
  }

  public crearTareaDirectamente(titulo: string, descripcion: string, prioridad: string): void {
    // Definir el objeto de la nueva tarea
    const nuevaTarea: Tarea = { 
      titulo,
      descripcion,
      prioridad,
    };

    // Llamar al servicio para crear la tarea en el backend
    this._servicoTareas.crearTarea(nuevaTarea).subscribe();
  }
  public listarTareasActivas() {
    let tareasActivas: Tarea[] = [];
    this.tareas.forEach((tarea) => {
      
        tareasActivas.push(tarea);
      
    });
    this.tareas = tareasActivas;
  }

  public listarTareasFinalizadas() {
    let tareasFinalizadas: Tarea[] = [];

    this.tareas.forEach((tarea) => {
   
        tareasFinalizadas.push(tarea);
    
    });
    this.tareas = tareasFinalizadas;
  }

  public listarTareasEliminadas() {
    let tareasEliminadas: Tarea[] = [];
    this.tareas.forEach((tarea) => {
      console.log();
       
        tareasEliminadas.push(tarea);
     
    });
    console.log(tareasEliminadas);
    this.tareas = tareasEliminadas;
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
        break;
    }
  }
}
