import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tarea } from '../../Interfaces/tarea';
import { TareasService } from '../../service/servicio-tareas.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-crear-tarea-view',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './crear-tarea-view.component.html',
  styleUrls: ['./crear-tarea-view.component.css']
})
export class CrearTareaViewComponent {
  private readonly _formBuilder = inject(FormBuilder);
  public formGroup = this._formBuilder.group({
    titulo: ['', Validators.required],
    descripcion: ['', [Validators.required]],
    prioridad: ['', Validators.required], 
  });

  constructor(
    private _servicioTareas: TareasService,
    private router: Router
  ) {} 

  public crearTarea(): void {
    if (this.formGroup.valid) {
      let tarea: Tarea = {
        titulo: this.formGroup.controls.titulo.value!,
        descripcion: this.formGroup.controls.descripcion.value!,
        prioridad: this.formGroup.controls.prioridad.value!
      };

      this._servicioTareas.crearTarea(tarea).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  public inputTituloInvalido: boolean = false;
  public inputDescripcionInvalido: boolean = false; 
  public inputPrioridadInvalido: boolean = false;
}