import { Component } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {

  nombre: string = '';
  precio: number = 0;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
    
    ) { }

  ngOnInit() {

  }

  onCreate(): void{
    const producto = new Producto(this.nombre, this.precio);
      this.productoService.save(producto).subscribe({
        next: data => {
          this.toastr.success('Producto creado', 'OK', {      // Notificación por 3 segundos
            timeOut: 3000, positionClass: 'toast-top-center' 
          });
          this.router.navigate(['/']);
        },
        error: err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }
      }
    );
  }

}