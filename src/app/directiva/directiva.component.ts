import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  listaCurso: String[] = ['Typescript','JavaScript','Java SE','PHP','C#'];

  habilitar: boolean = true;
  btnMostrarTxt: String = 'Ocultar';

  setHabilitar(): void {
    this.habilitar = (!this.habilitar)
    this.btnMostrarTxt = this.habilitar == true ? 'Ocultar' : 'Mostrar'; 
  }
}
