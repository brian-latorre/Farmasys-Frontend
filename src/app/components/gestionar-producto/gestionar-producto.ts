import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestionar-producto.html',
  styleUrl: './gestionar-producto.css',
})
export class GestionarProductoComponent implements OnInit {
  productos: any[] = [];
  productoForm: FormGroup;
  mostrarFormulario = false;
  productoEnEdicionId: number | null = null;
  mensajeError: string | null = null;

  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.productoForm = this.fb.group({
      codBarras: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioCosto: ['', [Validators.required, Validators.min(0)]],
      precioVenta: ['', [Validators.required, Validators.min(0)]],
      laboratorio: ['', Validators.required],
      registroSanitario: [''],
      condicionVenta: ['LIBRE', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (datosDelBackend: any) => {
        this.productos = datosDelBackend;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  nuevoProducto(): void {
    this.mostrarFormulario = true;
    this.productoEnEdicionId = null;
    this.mensajeError = null;
    this.productoForm.reset({ condicionVenta: 'LIBRE' });
  }

  editarProducto(prod: any): void {
    this.mostrarFormulario = true;
    this.productoEnEdicionId = prod.id;
    this.mensajeError = null;
    this.productoForm.patchValue(prod);
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }
    
    this.mensajeError = null;
    const productoData = this.productoForm.value;

    if (this.productoEnEdicionId) {
      this.productoService.actualizarProducto(this.productoEnEdicionId, productoData).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarProductos();
          alert('Producto actualizado con éxito');
        },
        error: (err) => {
          this.mensajeError = err.error?.message || 'Error al actualizar producto. ¿El código de barras ya existe?';
        }
      });
    } else {
      this.productoService.crearProducto(productoData).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarProductos();
          alert('Producto registrado con éxito');
        },
        error: (err) => {
          this.mensajeError = err.error?.message || 'Error al registrar producto. ¿El código de barras ya existe?';
        }
      });
    }
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }
}
