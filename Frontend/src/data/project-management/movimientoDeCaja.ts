export interface MovimientoDeCaja {
  id: number;
  created_at: Date;
  pagos_fk: string;
  cobros_fk: number;
  cobro_pago: string;
  categoria: string;
  usuario: string;
  notas: string;
  monto: number;
  saldo: number;
  caja: number;
  caja_cash: number;
  caja_GEO: number;
  caja_CAP: number;
  caja_IS: number;
  caja_SAG: number;
  caja_ISV: number;
  caja_LA: number;
  caja_MVP: number;
  caja_ZCC: number;
  caja_Sucesion: number;
  movimiento: string;
}
