export interface Cobro {
  cobro_id: number | null,
  createdAt: Date,
  fecha:  Date,
  usuario: string,
  proc:string,
  capital_honorarios: string,
  monto: number,
  PCL: number,
  cuota:string,
  quien_cobra: string,
  cobrado_sn: number,
  notas:string,
  actor_moroso_sn:string,
  libranza_judicial_transferencia_directa: string,
  confirmado_por_receptor: string,
}

export const cobroInicial: Cobro = {
    cobro_id: 0,
    quien_cobra:'',
    usuario:'',
    proc: '',
    PCL: 0,	
    notas: '',
    monto: 0,
    libranza_judicial_transferencia_directa:'',
    fecha:new Date(),
    cuota:'',
    createdAt: new Date(),
    confirmado_por_receptor:'',
    cobrado_sn: 0,	
    capital_honorarios:'',
    actor_moroso_sn: ''
  }
  