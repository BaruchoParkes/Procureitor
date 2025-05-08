export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Movimiento {
  mtoId: number;
  proc: string;
  createdAt: string;
  fecha: Date;
  tipoDeMovimiento: string;
  usuario: string;
  descripcion: string;
  Realizado: string;
  texto: string;
  archivo: string;
  actor: string;
  pteDemandada: string;
  tpoProceso: string;
  Proc: {
    ACTO: string;
    DEMA: string;
  };
  Miembro: string;
}
