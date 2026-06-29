import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MercaderiaService } from '../../services/mercaderia.service';

@Component({
  selector: 'app-registrar-mercaderia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-mercaderia.html',
  styleUrl: './registrar-mercaderia.css',
})
export class RegistrarMercaderiaComponent {
  mercaderiaForm: FormGroup;
  mensaje: string | null = null;
  esExito: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mercaderiaService: MercaderiaService
  ) {
    this.mercaderiaForm = this.fb.group({
      codBarrasProducto: ['', Validators.required],
      nroLote: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      stockFisico: ['', [Validators.required, Validators.min(1)]]
    });
  }

  registrarIngreso(): void {
    if (this.mercaderiaForm.invalid) {
      this.mercaderiaForm.markAllAsTouched();
      return;
    }

    const datos = this.mercaderiaForm.value;

    this.mercaderiaService.registrarIngreso(datos).subscribe({
      next: (res) => {
        this.esExito = true;
        this.mensaje = '¡Mercadería registrada con éxito! Lote: ' + res.nroLote;
        this.mercaderiaForm.reset();
      },
      error: (err) => {
        this.esExito = false;
        this.mensaje = err.error?.message || 'Error al registrar la mercadería. Verifique el código de barras.';
      }
    });
  }
}
