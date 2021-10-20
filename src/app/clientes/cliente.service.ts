import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // datePipe = new DatePipe('en-US');

  private urlEndpoint: string = 'http://localhost:8080/api/clientes';
  private httpHeader = new HttpHeaders( {'content-Type': 'application/json'} );


  constructor(private http: HttpClient, private router: Router) { }
  // Esto funciona de modo síncrono
  getClientes(): Observable<Cliente[]> { 
    // Basado en el patrón de diseo observador
    // return of(CLIENTES) // Esto lo convierte en un stream flujo de datos, de forma reactiva   
    return this.http.get<Cliente[]>(this.urlEndpoint).pipe(
      map( response =>  {
        let clientes = response as Cliente[]; 

        return clientes.map( cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.apellido = cliente.apellido.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy', 'en-US');
          // let datePipe = new DatePipe('en-US');
          // cliente.createAt = this.datePipe.transform(cliente.createAt,'EEE dd, MMM yyyy');
          return cliente;
        })
        // Así permito modificar mis datos al leerlos 
      }
      )
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, cliente, { headers: this.httpHeader }).pipe(
      catchError( e => {

        if(e.status==400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe( 
      catchError( e => {
        this.router.navigate(['/clientes']); 
        console.log(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )    
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeader }).pipe(
      catchError( e => {

        
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{ headers: this.httpHeader }).pipe(
      catchError( e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    )
  }

}