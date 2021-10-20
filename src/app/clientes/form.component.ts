import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router'; '@angular/router'
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  titulo: string = 'Crear cliente';
  cliente: Cliente = new Cliente();
  errores: string[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente',`${response.mensaje}: ${response.cliente.nombre}`,'success'); 
      },
      err => {
        this.errores = err.error.errors as string[];
        // Opcionalmente agregar error a consola
      }
    );
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe( params => {

      let id = params['id']
      if(id) {
        this.clienteService.getCliente(id).subscribe( cliente => this.cliente = cliente )
      }

    })
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe( response => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${response.mensaje}: ${response.cliente.nombre} `, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      // Opcionalmente agregar error a consola
    })
  }
}