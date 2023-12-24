import { Component } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent {

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService, 
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      {
        next: data => {
          this.productos = data;
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  borrar(id: number | undefined){
    if (id !== undefined) {
      this.productoService.delete(id).subscribe(
        {
          next: data => {
            this.toastr.success('Producto Eliminado', 'OK', {   // Notificación si se elimina por 3 segundos
              timeOut: 3000, positionClass: 'toast-top-center'
              });
              this.cargarProductos();
          },
          error: err => {
            this.toastr.error(err.error.mensaje, 'Fail', {    // Notificación si falla eliminar por 3 segundos
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        }
        );
     }
  }

}
