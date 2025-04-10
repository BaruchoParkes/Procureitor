import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Movimiento } from 'data/project-management/Movimiento';
import { TipoDeMovimiento, tipoDeMtoInicial } from 'data/project-management/tipoDeMovimiento';
import { Cobro, cobroInicial } from 'data/project-management/Cobro';
import axios, { AxiosError } from 'axios';
import { TextEditor } from 'components/Cap/TextEditor';
import { MovimientoDeCaja } from 'data/project-management/movimientoDeCaja';
import { useAuth } from 'providers/AuthProvider';
import BackgroundColorForm from 'components/modules/kanban/create-board/BackgroundColorForm';


const MovimientoComponent = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [mto, setMto] = useState<Movimiento>({
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
      DEMA: "GALENO ASEGURADORA DE RIESGOS DEL TRABAJO S.A."
    },
    Miembro: "",
    cobros_fk: 0,
    whatsapp: '',
    grok: ''
  });

  const { id } = useParams();
  const [texto, setTexto] = useState('Sr Juez: PARKES CRISTIAN ANDRES');
  const [tipoDelTipo, setTipoDelTipo] = useState('');
  const [fecha, setFecha] = useState<Date>(new Date());
  const [realizado, setRealizado] = useState<number>(1);
  const [tmto, setTmto] = useState<TipoDeMovimiento>(tipoDeMtoInicial);
  const [tipos, setTipos] = useState<TipoDeMovimiento[]>([]);
  const [cobro, setCobro] = useState<Cobro>(cobroInicial)

  const autos = `${mto.Proc.ACTO} C/ ${mto.Proc.DEMA}`;
  const autos_cortos = `${mto.Proc.ACTO.split(" ")[0]} C/ ${mto.Proc.DEMA.split(" ")[0]}`;

  // Fetch Movimiento
  useEffect(() => {
    const fetchMto = async () => {
      try {
        const response = await axios.get(`/mtos/id/${id}`);
        setMto(response.data);
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
      setTmto(selectedTipo);
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
      const newDescripcion = `Cobro: $${cobro.monto || 0} - ${cobro.capital_honorarios} - Cobra: ${cobro.quien_cobra || 'Cash'} - ${cobro.estado}`;
    //  console.log('Setting cobro descripcion:', newDescripcion);
      const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - Cobra: ${cobro.quien_cobra || 'Cash'}`;

      let mtoid = mto.mtoId
      setMto(prev => ({ ...prev, descripcion: newDescripcion }));
      setCobro(prev => ({ ...prev, nombre: newNombreCobro, mtos_fk: mtoid }));
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRealizado(event.target.value === 'Realizado' ? 1 : 0);
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

    let cobra = ''
    let concepto = ''
    let estado = ''

    switch (tmto.tipoMtoID){
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
    setCobro(prev => ({ ...prev, quien_cobra: cobra, capital_honorarios: concepto, estado : estado}));
    setCobro(prev => ({ ...prev, monto: Number(event.target.value) || 0, usuario: user?.iniciales }));
  };
  
  const handleCHchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, capital_honorarios: event.target.value}));
    const newNombreCobro = `${autos_cortos || ''} - ${cobro.capital_honorarios} - $ ${cobro.monto} - Cobra: ${cobro.quien_cobra || 'Cash'}`;
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
    setCobro(prev => ({ ...prev, Libranza_Judicial_Transferencia_Directa: event.target.value }));
  };

  const handleSelectChangeCobrado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, estado: event.target.value }));
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
    setCobro(prev => ({ ...prev, proc: mto.proc, usuario: user?.iniciales }));
    const confirmSave = window.confirm(
      `Estas guardando un cobro por un monto de $${cobro.monto || 0} 
      ${ (cobro.PCL>0) ? `PCL por una suma de $${cobro.PCL}`  : ''}
      ${ (cobro.quien_cobra!='') ? `cobrado por ${cobro.quien_cobra}` : 'cobrado en efectivo'}
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

       if (cobro.estado === 'Cobrado') {
          const cajaData = {
          monto: cobro.monto || 0,
          categoria: 'Cobro', // Adjust as needed
          usuario: user?.iniciales || 'unknown',
          cobros_fk: response.data,
          cobro_pago: 'c',
          notas: cobro.notas,
          caja: cobro.quien_cobra,
          created_at: new Date(),
        };

        console.log('cajaData: ',cajaData)

        let cajaResponse: any;
        try{
        cajaResponse = await axios.post('/caja/store', cajaData);
        console.log('Caja row created:', cajaResponse.data);
        }
        catch(error){console.log(error)}
      }
 
      // Update mto with the new cobro ID
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
        <Col xs={12} md={6}>
          <DatePicker
            value={fecha}
          />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
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

            <Col xs={12} md={6}>
              <FloatingLabel controlId="monto" label="Monto">
                <Form.Control
                  size="lg"
                  type="number"
                  value={cobro.monto || ''}
                  onChange={handleMontoChange}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6} md={3}>
              <FloatingLabel controlId="c/h" label="Capital/Honorarios">
                <Form.Select
                  size="lg"
                  value={cobro.capital_honorarios || ''}
                  onChange={handleCHchange}
                >
                  <option value="Capital">Capital</option>
                  <option value="Honorarios">Honorarios</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6} md={3}>
              <FloatingLabel controlId="pcl" label="PCL">
                <Form.Control
                  size="lg"
                  type="number"
                  value={cobro.PCL || ''}
                  onChange={handlePCLChange}
                />
              </FloatingLabel>
              </Col>
            
            {/* Column for Notas */}
            <Col xs={12}>
              <FloatingLabel controlId="notas" label="Notas">
                <Form.Control
                  size="lg"
                  type="text"
                  value={cobro.notas || ''}
                  onChange={handleNotasChange}
                />
              </FloatingLabel>
            </Col>
        
            {/* Column for Quien Cobra */}
            <Col xs={12} md={6}>
              <FloatingLabel controlId="quien_cobra" label="Quien Cobra">
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
              </FloatingLabel>
            </Col>
        
            {/* Columns for Transferencia/Libranza and Estado */}
            <Col xs={12} md={3}>
              <Form.Select
                size="lg"
                onChange={handleSelectChangeTranfeOLJ}
                value={cobro.libranza_judicial_transferencia_directa || ''}
              >
                <option value="Transferencia Directa">Transferencia Directa</option>
                <option value="Libranza Judicial">Libranza Judicial</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <FloatingLabel controlId="estado" label="Estado">
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
              </FloatingLabel>
            </Col>
          </Row>
        
          {/* Submit Button */}
          <div className="mt-3">
            <Button variant="primary" className="px-5" onClick={handleSubmitCobro}>
              Guardar Cobro
            </Button>
            <span style={{ color: 'black' }}>             {cobro.nombre}</span>
          </div>
        </div>
      )}

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
  );
};

export default MovimientoComponent;