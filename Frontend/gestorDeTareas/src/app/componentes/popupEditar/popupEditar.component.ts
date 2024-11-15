import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Tarea } from '../../Interfaces/tarea';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './popupEditar.component.html',
  styleUrls: ['./popupEditar.component.css']
})
export class PopupComponent {
  @Input() tarea!: Tarea;
  @Output() cerrarPopup = new EventEmitter<void>();
  @Output() tareaActualizada = new EventEmitter<Tarea>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.tarea) {
      this.formGroup.patchValue({
        titulo: this.tarea.titulo,
        descripcion: this.tarea.descripcion,
        prioridad: this.tarea.prioridad,
      });
    }
  }

  actualizarTarea() {
    if (this.formGroup.valid) {
      const tareaActualizada: Tarea = {
        ...this.tarea,
        ...this.formGroup.value,
      };
      this.tareaActualizada.emit(tareaActualizada);
      this.cerrarPopup.emit();
    }
  }

  cerrar() {
    this.cerrarPopup.emit();
  }
}
