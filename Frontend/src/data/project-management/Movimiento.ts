import bg51 from 'assets/img/generic/51.png';
import bg52 from 'assets/img/generic/52.png';
import bg53 from 'assets/img/generic/53.png';
import bg54 from 'assets/img/generic/54.png';
import bg55 from 'assets/img/generic/55.png';
import bg56 from 'assets/img/generic/56.png';
import bg57 from 'assets/img/generic/57.png';

import { BadgeBg } from 'components/base/Badge';
import { Member, members } from 'data/users';
import axios from 'axios';



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
    Ojud: {nombre_corto: string}
  };
  Miembro: string,
  cobros_fk: number,
  whatsapp: string,
  grok: string
}

export const mtoInicial: Movimiento = {
mtoId: 1437,
proc: "5yURv&mC0q",
createdAt: new Date(),
fechaDeRealizacion: new Date(),
tipoDeMovimiento: "",
usuario: "",
descripcion: "",
Realizado: "",
texto: "",
archivo: "",
actor: "",
pteDemandada: "",
tpoProceso: "",
Proc: {
  ACTO: "ZERRIZUELA SERGIO DANIEL",
  DEMA: "GALENO ASEGURADORA DE RIESGOS DEL TRABAJO S.A.",
  TPRO: 'ENFERMEDAD',
  Ojud: {
    nombre_corto: 'TT1 LZ'
  }
},
Miembro: "",
cobros_fk: 0,
whatsapp: '',
grok: ''
}