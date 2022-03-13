import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild( 'txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar( ){
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);

    // Borrar la caja de texto después de pulsar intro
    this.txtBuscar.nativeElement.value = '';
  }

}
