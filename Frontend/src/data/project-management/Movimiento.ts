export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Movimiento {
  mtoId: number;
  proc: string;
  createdAt: Date;
  fechaDeRealizacion: Date;
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
    TPRO: string;
    Ojud: { nombre_corto: string };
  };
  Miembro: string;
  cobros_fk: number;
  whatsapp: string;
  grok: string;
}

export const mtoInicial: Movimiento = {
  mtoId: 1437,
  proc: '5yURv&mC0q',
  createdAt: new Date(),
  fechaDeRealizacion: new Date(),
  tipoDeMovimiento: '',
  usuario: '',
  descripcion: '',
  Realizado: '',
  texto: '',
  archivo: '',
  actor: '',
  pteDemandada: '',
  tpoProceso: '',
  Proc: {
    ACTO: 'ZERRIZUELA SERGIO DANIEL',
    DEMA: 'GALENO ASEGURADORA DE RIESGOS DEL TRABAJO S.A.',
    TPRO: 'ENFERMEDAD',
    Ojud: {
      nombre_corto: 'TT1 LZ'
    }
  },
  Miembro: '',
  cobros_fk: 0,
  whatsapp: '',
  grok: ''
};
