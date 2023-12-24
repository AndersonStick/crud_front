import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // URL de SpringBoot 
  productoURL = 'http://localhost:8080/producto';

  constructor(private httpClient: HttpClient) { }

  // Arreglo porque devuelve varios productos
  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + '');
  }
  
  // Mostrar un único producto por el id
  public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `/detail/${id}`);
  }

  // Mostrar un único producto por el nombre
  public detailName(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `/detailname/${nombre}`);
  }

  // Crear un nuevo producto
  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + '/create', producto); // Request body por ser post
  }

  // Actualizar un producto por id
  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `/update/${id}`, producto); 
  }

  // Borrar un producto por id
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `/delete/${id}`);
  }
}
