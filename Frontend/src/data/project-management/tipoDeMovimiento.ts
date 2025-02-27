
export interface TipoDeMovimiento {
  tipoMtoID: string,
  movimiento: string,
  tipo: string,
  tituloEscrito: string,
  cuerpoEscrito: string,
  informe: string,
  proximoPasoID: string,
  ppEnCuantosDias: number,
  estadoProcesal: string, 
}

export const tipoDeMtoInicial: TipoDeMovimiento = 
  { tipoMtoID: "",
    movimiento: "",
    tipo: "",
    tituloEscrito: "SOLICITA",
    cuerpoEscrito: "Que vengo a solicitar",
    informe: "",
    proximoPasoID: "",
    ppEnCuantosDias: 90,
    estadoProcesal: ""}