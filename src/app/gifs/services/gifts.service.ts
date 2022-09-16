import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaGifs, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private apiKey = 'R0fgMYz4N5tASzHer2Ppgmd91I0xOU20';
  private _historial: string[] = [];
  //ToDo cambiar any por su tipado
  public resultados: Gif [] = [];

  get historial() {
    return [...this._historial]
  }
  constructor(private http: HttpClient) { 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
  }

  buscarGifts(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) { //validacion , si no se incluye query 
      this._historial.unshift(query); //unshift interta al inicio
      this._historial = this._historial.splice(0, 9)

      localStorage.setItem('historial',JSON.stringify(this._historial)) //grabando en el local storage
    }

    this.http.get<BusquedaGifs>(`https://api.giphy.com/v1/gifs/search?api_key=R0fgMYz4N5tASzHer2Ppgmd91I0xOU20&q=${query} z&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data
      })

  }

}
