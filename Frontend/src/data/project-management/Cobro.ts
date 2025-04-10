export interface Cobro {
  cobro_id: number | null,
  created_at: Date,
  fecha:  Date,
  usuario: string | null | undefined,
  proc:string,
  capital_honorarios: string,
  monto: number,
  PCL: number,
  cuota:string,
  quien_cobra: string,
  nombre: string,
  notas:string,
  estado: string,
  libranza_judicial_transferencia_directa: string,
  confirmado_por_receptor: string,
  mtos_fk: number
}

export const cobroInicial: Cobro = {
    cobro_id: 0,
    usuario:'',
    proc: '',
    PCL: 0,	
    notas: '',
    monto: 0,
    libranza_judicial_transferencia_directa:'',
    fecha:new Date(),
    cuota:'',
    created_at: new Date(),
    confirmado_por_receptor:'',
    quien_cobra: '',	
    nombre: '',
    capital_honorarios:'',
    estado: 'Pendiente',
    mtos_fk: 1

  }
  