
export interface TipoDeGasto {

  gastoId: string,
  gasto:string,
  concepto:string
  }

export const tipoDeGastoInicial: TipoDeGasto = 
  {   
    gastoId: '',
    gasto: '',
    concepto: ''
  }