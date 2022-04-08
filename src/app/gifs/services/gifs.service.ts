import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'KhGxWF3KFMTH94aX4E1Ormp8qaswJHyk';
  private _historial: string[] = [];
  
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  // para hacer peticiones POST, GET, etc
  constructor ( private http:HttpClient ){

    // obtenemos el historial del localstorage
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string ){

    // almacenamos todo en minúsculas
    query = query.trim().toLocaleLowerCase();

    // inserta si no existe previamente
    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      // solo muestra 10 resultados
      this._historial = this._historial.splice(0,10);

      // grabar en el localstorage
      localStorage.setItem('historial', JSON.stringify( this._historial));
    }

    // metemos el query en la petición http
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=KhGxWF3KFMTH94aX4E1Ormp8qaswJHyk&q=${ query }&limit=10`)
      .subscribe( (resp: any ) => {
        console.log( resp.data );
        this.resultados = resp.data;
        // grabar en el localstorage
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });

  }
}
