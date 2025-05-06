import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Movimiento, mtoInicial } from 'data/project-management/Movimiento';
import { TipoDeMovimiento, tipoDeMtoInicial } from 'data/project-management/tipoDeMovimiento';
import { Cobro, cobroInicial } from 'data/project-management/Cobro';
import axios from 'axios';
import  { AxiosError } from 'axios';
import { TextEditor } from 'components/Cap/TextEditor';
import { useAuth } from 'providers/AuthProvider';

const MovimientoComponent = () => {

  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mto, setMto] = useState<Movimiento>(mtoInicial);
  const { id } = useParams();
  const [texto, setTexto] = useState('Sr Juez: PARKES CRISTIAN ANDRES');
  const [tipoDelTipo, setTipoDelTipo] = useState('');
  const [fecha, setFecha] = useState<Date>(new Date());
  const [realizado, setRealizado] = useState<number>(1);
  const [tmto, setTmto] = useState<TipoDeMovimiento>(tipoDeMtoInicial);
  const [tipos, setTipos] = useState<TipoDeMovimiento[]>([]);
  const [cobro, setCobro] = useState<Cobro>(cobroInicial)
  const autos = `${mto.Proc.ACTO} C/ ${mto.Proc.DEMA} S/ ${mto.Proc.TPRO}`;
  const autos_cortos = `${mto.Proc.ACTO.split(" ")[0]} C/ ${mto.Proc.DEMA.split(" ")[0]} S/ ${mto.Proc.TPRO.split(" ")[0]}`;

  // Fetch Movimiento
  useEffect(() => {
    const fetchMto = async () => {
      try {
        const response = await axios.get(`/mtos/id/${id}`);
        setMto(response.data);
        console.log(mto)
      } catch (error) {
        console.error('Error fetching movimiento:', error);
      }
    };
    fetchMto();
  }, [id]);

  // Fetch Tipos
  useEffect(() => {
    const fetchTMto = async () => {
      try {
        const response = await axios.get('/tMtos');
        setTipos(response.data);
      } catch (error) {
        console.error('Error fetching tipos:', error);
      }
    };
    fetchTMto();
  }, []);

  // Sync mto fields, tmto, and cobro proc
  useEffect(() => {
    if (mto.texto) setTexto(mto.texto);
    if (mto.fechaDeRealizacion) setFecha(mto.fechaDeRealizacion);
    if (mto.tipoDeMovimiento && tipos.length > 0) 
      { try{
      const selectedTipo = tipos.find(tipo => tipo.tipoMtoID === mto.tipoDeMovimiento) || tipoDeMtoInicial;
    //  console.log('Selected TipoDeMovimiento:', selectedTipo);
     // setTmto(selectedTipo);
     // setTipoDelTipo(selectedTipo.tipo);
      // Set initial descripcion from tmto.tituloEscrito if not already set
      /* if (!mto.descripcion) {
        setMto(prev => ({ ...prev, descripcion: selectedTipo.tituloEscrito || '' }));
      } */
        }
    catch{}}
  }, [mto]);

  // Fetch Cobro and update descripcion
  useEffect(() => {
    const fetchCobro = async () => {
      if (mto.cobros_fk && mto.cobros_fk !== 0) {
        try {
          const response = await axios.get(`/cobros/id/${mto.cobros_fk}`);
          console.log('Fetched cobro', response.data);
          setCobro(response.data);
        } catch (error) {
          console.error('Error fetching cobro:', (error as AxiosError).response?.data || (error as AxiosError).message);
        }
      }
    };
    fetchCobro();
  }, [mto.cobros_fk]);

  // Update descripcion dynamically when tranfe changes
  useEffect(() => {
    const isSaleTranfeActive = ['Transferencia'].includes(tmto.tipo);
    if (isSaleTranfeActive && (cobro.monto || cobro.quien_cobra)) {
      const newDescripcion = `Cobro: $${cobro.monto}(${cobro.capital_honorarios}) ${cobro.capital_honorarios == 'Capital' ? ' - PCL: $' + cobro.PCL : ''}- Cobra: ${cobro.quien_cobra || 'Efectivo'} - ${cobro.estado}`;
      console.log('Setting cobro descripcion:', newDescripcion);
      const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - PCL: $${cobro.PCL}-  Cobra: ${cobro.quien_cobra || 'Efectivo'}`;

      let mtoid = mto.mtoId
      mto.descripcion= newDescripcion ;
      cobro.nombre = newNombreCobro;
    }
  }, [cobro, tmto.tipoMtoID]);

  const handleFechaChange = (date: Date | null) => {
    if (date) setFecha(date);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMto(prev => ({ ...prev, tipoDeMovimiento: event.target.value }));
  };

  const handleTextChange = (newValue: string) => {
    setTexto(newValue);
  };

  const handleTMtoSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedTipo = tipos.find(tipo => tipo.movimiento === selectedValue) || tipoDeMtoInicial;
    setTmto(selectedTipo);
    setTipoDelTipo(selectedTipo.tipo);
    setMto(prev => ({
      ...prev,
      tipoDeMovimiento: selectedTipo.tipoMtoID,
      descripcion: selectedTipo.tituloEscrito || prev.descripcion // Use tmto.tituloEscrito, preserve user edits if present  
    }))

    let cobra = ''
    let ch = ''
    let estado = ''

    switch (tmto.tipoMtoID){
      case '01':
          cobra = "";
          ch = 'Capital';
          estado = 'Pendiente';
        break;
      case '011':
          cobra = "GEO";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '012':
          cobra = "CAP";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '013':
          cobra = "MVP";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '014':
          cobra = "SAG";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '015':
          cobra = "IS";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '016':
          cobra = "ISV";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '017':
          cobra = "ZCC";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '018':
          cobra = "LA";
          ch = 'Honorarios';
          estado = 'Cobrado';
        break;
    };
    setCobro(prev => ({ ...prev, quien_cobra: cobra, capital_honorarios: ch, estado: estado}));
  };

  const handleMontoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMonto = Number(event.target.value) || 0;

    let cobra = ''
    let concepto = ''
    let estado = ''
    let pcl = 0
    let capital = false;

    switch (tmto.tipoMtoID){
      case '01':
        cobra = "";
        concepto = 'Capital';
        estado = 'Pendiente';
        if (
        mto?.Proc?.Ojud?.nombre_corto?.substring(0, 3) === 'SRT'
        ) {
          console.log('entro al if de SRT')
          pcl = newMonto * 0.1;
      } else {
        console.log('entro al else')
        pcl = newMonto * 0.2;
      };
        capital = true;
      break;
      case '011':
          cobra = 'GEO';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '012':
          cobra = 'CAP';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '013':
          cobra = 'MVP';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '014':
          cobra = 'SAG';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '015':
          cobra = 'IS';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '016':
          cobra = 'ISV';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '017':
          cobra = 'ZCC';
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
        case '018':
          cobra = 'LA';          
          concepto = 'Honorarios';
          estado = 'Cobrado';
        break;
    };
    const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - PCL: $${cobro.PCL}-  Cobra: ${cobro.quien_cobra || 'Cash'}`;
    setCobro(prev => ({
      ...prev,
      mtos_fk: mto.mtoId,
      monto: newMonto,
      quien_cobra: cobra,
      capital_honorarios: concepto,
      estado: estado,
      usuario: user?.iniciales,
      PCL: pcl,
      nombre: newNombreCobro
    }));
  }
  
  const handleCHchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, capital_honorarios: event.target.value}));
    const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - Cobra: ${cobro.quien_cobra || 'Efectivo'}`;
    setCobro(prev => ({ ...prev, nombre: newNombreCobro }));
  };

  const handlePCLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCobro(prev => ({ ...prev, PCL: Number(event.target.value) || 0 }));
  };

  const handleNotasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCobro(prev => ({ ...prev, notas: event.target.value }));
  };

  const handleQuienCobraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, quien_cobra: event.target.value }));
  };

  const handleSelectChangeTranfeOLJ = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, libranza_judicial_transferencia_directa: event.target.value }));
  };

  const handleFechadepagoChange = (dates: Date[]) => {
    const date = dates && dates.length > 0 ? dates[0] : null;
    if (date) {
    const formattedDate = date.toISOString().split('T')[0];
    setCobro(prev => ({
      ...prev,
      fecha_de_pago: formattedDate,
    }));
    } else {
    setCobro(prev => ({
      ...prev,
      fecha_de_pago: '',
    }));
  }  
  };

  const handleSelectChangeCobrado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, estado: event.target.value }));
    console.log(cobro);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>, updatedMto?: Movimiento) => {
    e.preventDefault();
    try {
      const mtoToSave = updatedMto || mto;
      await axios.post('/mtos/update', {
        id: mtoToSave.mtoId,
        descripcion: mtoToSave.descripcion,
        texto,
        realizado,
        fechaDeRealizacion: fecha,
        cobros_fk: mtoToSave.cobros_fk,
        tipoDeMovimiento: mtoToSave.tipoDeMovimiento,
        usuario: user?.iniciales
      });
      navigate(-1);
    } catch (error) {
      console.error('Error updating movimiento:', error);
    }
  };

  const handleSubmitCobro = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newDescripcion = `Cobro: $${cobro.monto}(${cobro.capital_honorarios}) ${cobro.capital_honorarios == 'Capital' ? ' - PCL: $' + cobro.PCL : ''}- Cobra: ${cobro.quien_cobra || 'Efectivo'} - ${cobro.estado}`;
    setMto(prev => ({ ...prev, descripcion: newDescripcion }));
    const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - PCL: $${cobro.PCL}-  Cobra: ${cobro.quien_cobra || 'Efectivo'}`;
    setCobro(prev => ({ ...prev, proc: mto.proc, usuario: user?.iniciales, nombre: newNombreCobro }));

    const confirmSave = window.confirm(
      `Estas guardando este cobro:

      Concepto: ${cobro.capital_honorarios}
      Monto: $ ${cobro.monto || 0} 
      PCL: $ ${cobro.PCL}
      Estado: ${cobro.estado}
      Cobra: ${ (cobro.quien_cobra!='') ?  `${cobro.quien_cobra}` : `efectivo`}
      Modo de pago: ${cobro.libranza_judicial_transferencia_directa}
      Notas: ${cobro.notas}
      
      Confirmas?`
    );

    if (!confirmSave) {
      console.log('cobro save cancelled');
      return; // Exit if user clicks Cancel
    }

    try {
      const { cobro_id, ...cobroData } = cobro;
      console.log('Sending cobro:', cobroData);
      const response = await axios.post('/cobros/store', cobroData);
      console.log('Response data:', response.data);
      const newCobroId = response.data; // Assuming response.data is the ID (adjust if it's tranfeId)
      console.log('Cobro created with ID:', response.data);

        setMto(prev => {
        const updatedMto = { ...prev, cobros_fk: response.data };
        console.log('Updated mto:', updatedMto);
        handleSubmit(e, updatedMto);
        return updatedMto;
      });
    } catch (error) {
      console.error('Error updating cobro:', (error as AxiosError).response?.data || (error as AxiosError).message);
    }
  };

  return (       
    <div className="p-4">

      <h2 className="mb-4">Movimiento en {autos}</h2>

      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <DatePicker
            value={fecha}
          />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} md={4}>
          <Form.Select
            size="lg"
            onChange={handleTMtoSelectChange}
            value={tipos.find(tipo => tipo.tipoMtoID === mto.tipoDeMovimiento)?.movimiento || ''}
          >
            <option value="">Seleccione Tipo de Movimiento</option>
            {tipos.map(tipo => (
              <option key={tipo.tipoMtoID} value={tipo.movimiento}>
                {tipo.movimiento}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {(tmto.tipo === 'Transferencia') && (


          <div id="saleTranfe" className="mb-4 p-3 bg-light border rounded" >
          <Row className="g-3">
            {/* Column for Monto and Capital/Honorarios */}

            <Col md={4}>
              <Form.Label>Monto</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  value={cobro.monto || ''}
                  onChange={handleMontoChange}
                />
              
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>Capital/Honorarios</Form.Label>
                <Form.Select
                  size="lg"
                  value={cobro.capital_honorarios || ''}
                  onChange={handleCHchange}
                >
                  <option value="Capital">Capital</option>
                  <option value="Honorarios">Honorarios</option>
                </Form.Select>
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>PCL</Form.Label>
                <Form.Control
                  size="lg"
                  type="number"
                  value={cobro.PCL || ''}
                  onChange={handlePCLChange}
                />
              </Col>
                                
            {/* Column for Quien Cobra */}
            <Col xs={12} md={4}>
            <Form.Label>Quien Cobra</Form.Label>
               <Form.Select
                  size="lg"
                  onChange={handleQuienCobraChange}
                  value={cobro.quien_cobra || ''}
                >
                  <option value="">Select</option>
                  <option value="Actor">Actor</option>
                  <option value="GEO">GEO</option>
                  <option value="SAG">SAG</option>
                  <option value="CAP">CAP</option>
                  <option value="LA">LA</option>
                  <option value="IS">IS</option>
                  <option value="MVP">MVP</option>
                  <option value="MSJ">MSJ</option>
                  <option value="ISV">ISV</option>
                  <option value="ZCC">ZCC</option>
                  <option value="EA">EA</option>
                  <option value="SUCESION">SUCESION</option>
                </Form.Select>
            </Col>
        
            {/* Columns for Transferencia/Libranza and Estado */}
            <Col xs={12} md={4}>
            <Form.Label>Liranza Judicial / Transferencia Directa</Form.Label>
              <Form.Select
                size="lg"
                onChange={handleSelectChangeTranfeOLJ}
                value={cobro.libranza_judicial_transferencia_directa || ''}
              >
                <option value="Libranza Judicial">Libranza Judicial</option>
                <option value="Transferencia Directa">Transferencia Directa</option>
              </Form.Select>
            </Col>

            <Col sm={6} md={4}>
          <Form.Label>Fecha de Pago</Form.Label>
          <DatePicker
            value={cobro.fecha_de_pago ? new Date(cobro.fecha_de_pago) : new Date()}
            onChange={handleFechadepagoChange}
            render={(_, ref) => (
              <Form.Floating>
                <Form.Control
                  type="date"
                  ref={ref}
                  id="fechadepago"
                  placeholder="Fecha de Pago"
                />
              </Form.Floating>
           
            )}
          />
        </Col>



            <Col xs={12} md={4}>
              <Form.Label>Estado</Form.Label>
                <Form.Select
                  size="lg"
                  onChange={handleSelectChangeCobrado}
                  value={cobro.estado || ''}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cobrado">Cobrado</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Actor Moroso">Actor Moroso</option>
                </Form.Select>
            </Col>

{/* Column for Notas  */}
              <Col md={4}>
              <Form.Label>Notas</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  value={cobro.notas || ''}
                  onChange={handleNotasChange}
                />
            </Col>


        
        
          {/* Submit Button */}
          <Col md={4} className="d-flex align-items-end">
          
            <Button variant="primary" className="px-5" onClick={handleSubmitCobro}>
              Guardar Cobro
            </Button>
            </Col>
            </Row>
         </div>
      )}

      {(tmto.tipo != 'Transferencia') && (
      <div>
      <Row className="g-3 mb-4">
        <Col xs={12}>
          <FloatingLabel controlId="descripcion" label="Descripción">
            <Form.Control
              size="lg"
              type="text"
              value={mto.descripcion}
              onChange={handleDescripcionChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <div style={{ height: '300px' }}>
            <TextEditor
              text={texto}
              titulo={tmto.tituloEscrito}
              cuerpo={tmto.cuerpoEscrito}
              autos={autos}
              handleTextChange={handleTextChange}
            />
          </div>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col xs="auto" className="d-flex gap-3">
          <Button variant="secondary" className="px-5" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" className="px-5" onClick={handleSubmit}>
            Guardar
          </Button>
        </Col>
      </Row>
    </div>
      )}

    </div>
  );
};

export default MovimientoComponent;