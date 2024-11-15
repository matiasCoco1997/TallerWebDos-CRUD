import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarea } from '../Interfaces/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService { 
  
  constructor(private http: HttpClient) { }

  public traerTareas(estado?: string): Observable<Tarea[]> { 
    let url = 'http://localhost:3000/api/tareas';
    if (estado) {
      url += `?estado=${estado}`;
    }
    return this.http.get<Tarea[]>(url);
  }


  // Obtener una tarea por ID
  public traerTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`http://localhost:3000/api/tareas/${id}`);
  }

  // Crear una nueva tarea
  public crearTarea(tarea: Tarea): Observable<void>  {
    console.log(tarea);
    return this.http.post<void>('http://localhost:3000/api/crearTarea', tarea);
  }

  // Editar una tarea existente
  public editarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`http://localhost:3000/api/tareas/${id}`, tarea);
  }

  // Marcar tarea como eliminada
  public eliminarTarea(id: number): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/api/tareas/eliminar/${id}`, {});
  }

  // Marcar tarea como finalizada
  public finalizarTarea(id: number): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/api/tareas/finalizar/${id}`, {});
  }
}
