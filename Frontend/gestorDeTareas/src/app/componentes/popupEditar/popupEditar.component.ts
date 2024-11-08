import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../Interfaces/tarea';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popupEditar.component.html',
  styleUrl: './popupEditar.component.css'
})
export class PopupComponent {
  @Input() tarea!: Tarea;
  @Output() cerrarPopup = new EventEmitter<void>();

  cerrar() {
    this.cerrarPopup.emit();
  }
}
