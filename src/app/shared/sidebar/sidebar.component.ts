import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../../gifs/services/gifts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(private giftsService: GiftsService) { }
  get historial(){
    return this.giftsService.historial;
  }
  buscar(termino: string){
   this.giftsService.buscarGifts(termino)
  }

}
