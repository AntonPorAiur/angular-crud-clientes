import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes-json';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
  // Esto funciona de modo síncrono
  getClientes(): Observable<Cliente[]> { // Basado en el patrón de diseo observador
    return of(CLIENTES) // Esto lo convierte en un stream flujo de datos, de forma reactiva 
  }

}