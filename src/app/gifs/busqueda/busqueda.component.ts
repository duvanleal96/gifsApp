import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor( private gifsService: GiftsService) { }

  ngOnInit(): void {
  }
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; // non-null asertion , el elemento (!) no es nulo

  buscar(){
    const valor = this.txtBuscar.nativeElement.value
    if(valor.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifts(valor);
    this.txtBuscar.nativeElement.value = '';
   
  }

}
