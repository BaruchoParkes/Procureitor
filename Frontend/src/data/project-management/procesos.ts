export interface Status {
  ongoing: number;
  critical: number;
  inactive: number;
  completed: number;
}

export interface Proceso {
  PROC: string;
  GRUP: string;
  TPRO: string;
  ACTO: string;
  DEMA: string;
  OBSE: string;
  CARP: string;
  INIC: string;
  FINA: string;
  DOCO: string;
  OJUD: string;
  INST: string;
  EXP1: string;
  EXP2: string;
  EXP3: string;
  EXP4: string;
  SUPE: string;
  MIEM: string;
  AUX1: string;
  AUX2: string;
  AUX3: string;
  AUX4: string;
  AUX5: string;
  AUX6: string;
  AUX7: string;
  AUX8: string;
  EDIT: string;
  Miembro: { Iniciales: string };
}

export const procesoInicial: Proceso = {
  AUX8: 'BLANCO JOSE LUIS C/ NAS ARGENTINA S.A. Y OTRO',
  PROC: '5yURv&6lIu',
  GRUP: 'A',
  TPRO: '5zU3@0007x',
  ACTO: 'BLANCO JOSE LUIS',
  DEMA: 'NAS ARGENTINA S.A. Y OTRO',
  OBSE: '',
  CARP: '2719',
  INIC: '20170908',
  FINA: '',
  DOCO: '5yURvn2Rgg',
  OJUD: '5zU3@000sJ',
  INST: '1',
  EXP1: '5389/2018',
  EXP2: '',
  EXP3: '',
  EXP4: '',
  SUPE: '1',
  MIEM: 'FAM',
  AUX1: '20190307',
  AUX2: '20190307',
  AUX3: '',
  AUX4: '',
  AUX5: '',
  AUX6: '',
  AUX7: '0,00',
  EDIT: '2024011515185yURv4IQaMM',
  Miembro: { Iniciales: 'AAA' }
};
