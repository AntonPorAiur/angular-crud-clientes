import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }
  
  ngOnInit(): void {
    // this.clientes = CLIENTES;
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes // función anónima (flecha)
    );
  }

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Confirmación',
      text: `¿Seguro que deseas eliminar a ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter( cli => cli !== cliente )
            swal.fire(
                'Cliente eliminao!',
                'Cliente eliminado con éxito',
            	  'success'
            ) 
          }
        )
      }
    })
  }


}