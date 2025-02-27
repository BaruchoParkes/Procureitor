import bg51 from 'assets/img/generic/51.png';
import bg52 from 'assets/img/generic/52.png';
import bg53 from 'assets/img/generic/53.png';
import bg54 from 'assets/img/generic/54.png';
import bg55 from 'assets/img/generic/55.png';
import bg56 from 'assets/img/generic/56.png';
import bg57 from 'assets/img/generic/57.png';

import { BadgeBg } from 'components/base/Badge';
import { Member, members } from 'data/miembros';
import axios from 'axios';



export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Pago {

  pagoId:  string, 
  pagoLabel: string,
  gastoIdFkEnPagos: string,
  concepto: string,
  importe:  number,
  fechaDeCarga: string,
  factura: string,
  documento: string,
  aclaracion: string,
  comprobante: string,
  estado: string,
  paga: string,
  fechadepago: string

}


export const pagoInicial: Pago ={

  pagoId:  "", 
  pagoLabel: "",
  gastoIdFkEnPagos: "",
  concepto: "",
  importe:  0,
  fechaDeCarga: "",
  factura: "",
  documento: "",
  aclaracion:"",
  comprobante: "",
  estado: "",
  paga: "",
  fechadepago: ""

}

