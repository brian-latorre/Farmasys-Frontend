import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaStockService } from '../../services/alerta-stock.service';

@Component({
  selector: 'app-alertas-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas-stock.html',
  styleUrl: './alertas-stock.css',
})
export class AlertasStockComponent implements OnInit {
  alertas: any[] = [];

  constructor(private alertaStockService: AlertaStockService) {}

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    this.alertaStockService.obtenerAlertas().subscribe({
      next: (data) => {
        this.alertas = data;
      },
      error: (err) => {
        console.error('Error al cargar alertas', err);
      }
    });
  }

  solicitarReposicion(alerta: any): void {
    alert(`Solicitud de reposición enviada para: ${alerta.nombreProducto} (Lote: ${alerta.nroLote})`);
  }
}
