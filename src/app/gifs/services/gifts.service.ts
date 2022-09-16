import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaGifs, Gif } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private apiKey = 'R0fgMYz4N5tASzHer2Ppgmd91I0xOU20';
  private _historial: string[] = [];
  public resultados: Gif [] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'


  get historial() {
    return [...this._historial]
  }
  get resultado(){
    return [...this.resultados]
  }
  constructor(private http: HttpClient) { 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!); //obteniendo el historial persistiendo los datos
    }
    this.resultados = JSON.parse(localStorage.getItem('resultado')!)||[]//obteniendo el resultado persistiendo los datos
  }

  buscarGifts(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) { //validacion , si no se incluye query 
      this._historial.unshift(query); //unshift interta al inicio
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('historial',JSON.stringify(this._historial)) //grabando en el local storage
    }
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('q',query)
      .set('limit','10');
      

    this.http.get<BusquedaGifs>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data
        localStorage.setItem('resultado',JSON.stringify(this.resultados))
      })

  }

}
