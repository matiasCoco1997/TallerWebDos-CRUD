import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Tarea } from '../Interfaces/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService { 
  
  constructor(private http: HttpClient) { }
  public traerTareas(): Observable<Tarea[]> { 
    return this.http.get<Tarea[]>('http://localhost:3000/api/tareas');
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

  // Eliminar una tarea por ID
  public eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/tareas/${id}`);
  }

}