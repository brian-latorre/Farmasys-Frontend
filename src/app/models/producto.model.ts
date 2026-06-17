export interface Producto {
  id?: number;
  codBarras: string;
  descripcion: string;
  precioVenta: number;
  precioCosto: number;
  laboratorio: string;
  registroSanitario: string;
  condicionVenta: string;
}
