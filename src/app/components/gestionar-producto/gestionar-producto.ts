import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-gestionar-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionar-producto.html',
  styleUrl: './gestionar-producto.css',
})
export class GestionarProductoComponent implements OnInit {
  productos: any[] = [];
  constructor(
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (datosDelBackend: any) => {
        this.productos = datosDelBackend;
        this.cdr.detectChanges();
        console.log('¡Éxito! Datos recibidos:', this.productos);
      },
      error: (error: any) => {
        console.error('Error de conexión con IntelliJ:', error);
      },
    });
  }
}
