import bg51 from 'assets/img/generic/51.png';
import bg52 from 'assets/img/generic/52.png';
import bg53 from 'assets/img/generic/53.png';
import bg54 from 'assets/img/generic/54.png';
import bg55 from 'assets/img/generic/55.png';
import bg56 from 'assets/img/generic/56.png';
import bg57 from 'assets/img/generic/57.png';

import { BadgeBg } from 'components/base/Badge';

export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Pago {
  pagoId: number;
  pagoLabel: string;
  gastoIdFkEnPagos: string;
  concepto: string;
  importe: number;
  fechaDeCarga: string;
  factura: File | string | null;
  documento: File | string | null;
  aclaracion: string;
  comprobante: File | string | null;
  estado: string;
  paga: string;
  fechadepago: Date | string | null;
  usuario: string;
  categoria: string;
}

export const pagoInicial: Pago = {
  pagoId: 1,
  pagoLabel: '',
  gastoIdFkEnPagos: '',
  concepto: '',
  importe: 0,
  fechaDeCarga: '',
  factura: null,
  documento: null,
  aclaracion: '',
  comprobante: null,
  estado: '',
  paga: '',
  fechadepago: new Date(),
  usuario: '',
  categoria: ''
};
