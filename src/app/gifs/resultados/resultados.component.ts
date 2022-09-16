import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  constructor(private  giftsServices : GiftsService) { }

  get resultados(){
    return this.giftsServices.resultados;
  }

}
