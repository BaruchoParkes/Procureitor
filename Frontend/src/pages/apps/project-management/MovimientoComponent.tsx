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

const MovimientoComponent = () => {

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
    if (mto.tipoDeMovimiento && tipos.length > 0) {
      const selectedTipo = tipos.find(tipo => tipo.tipoMtoID === mto.tipoDeMovimiento) || tipoDeMtoInicial;
      console.log('Selected TipoDeMovimiento:', selectedTipo);
      setTmto(selectedTipo);
     // setTipoDelTipo(selectedTipo.tipo);
      // Set initial descripcion from tmto.tituloEscrito if not already set
      /* if (!mto.descripcion) {
        setMto(prev => ({ ...prev, descripcion: selectedTipo.tituloEscrito || '' }));
      } */
    }
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
    const isSaleTranfeActive = ['01', '011', '012', '013', '014', '015', '016', '017', '018'].includes(tmto.tipoMtoID);
    if (isSaleTranfeActive && (cobro.monto || cobro.quien_cobra)) {
      const newDescripcion = `Cobro: $${cobro.monto || 0} - Cobra: ${cobro.quien_cobra || 'Cash'} - ${cobro.cobrado_sn ? 'Cobrado' : 'No Cobrado'}`;
      console.log('Setting cobro descripcion:', newDescripcion);
      setMto(prev => ({ ...prev, descripcion: newDescripcion }));
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
    }));
  };

  const handleMontoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCobro(prev => ({ ...prev, monto: Number(event.target.value) || 0 }));
  };

  const handlePCLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCobro(prev => ({ ...prev, PCL: Number(event.target.value) || 0 }));
  };

  const handleNotasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCobro(prev => ({ ...prev, Notas: event.target.value }));
  };

  const handleQuienCobraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, quien_cobra: event.target.value }));
  };

  const handleSelectChangeTranfeOLJ = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, Libranza_Judicial_Transferencia_Directa: event.target.value }));
  };

  const handleSelectChangeCobrado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCobro(prev => ({ ...prev, cobrado_sn: Number(event.target.value) }));
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
        usuario: localStorage.getItem('iniciales')
      });
      navigate(-1);
    } catch (error) {
      console.error('Error updating movimiento:', error);
    }
  };

  const handleSubmitCobro = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCobro(prev => ({ ...prev, proc: mto.proc, usuario: mto.usuario }));
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

      if (cobro.cobrado_sn === 1) {
        const cajaData = {
          monto: cobro.monto || 0,
          categoria: 'Cobro', // Adjust as needed
          usuario: localStorage.getItem('iniciales') || 'unknown',
          cobros_fk: response.data,
          cobro_pago: 'c',
          notas: cobro.notas,
          caja: cobro.quien_cobra,
          created_at: new Date()
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

  const autos = `${mto.Proc.ACTO} C/ ${mto.Proc.DEMA}`;

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

      {(tmto.tipoMtoID === '01' || tmto.tipoMtoID === '011' || tmto.tipoMtoID === '012' ||
        tmto.tipoMtoID === '013' || tmto.tipoMtoID === '014' || tmto.tipoMtoID === '015' ||
        tmto.tipoMtoID === '016' || tmto.tipoMtoID === '017' || tmto.tipoMtoID === '018') && (
        <div id="saleTranfe" className="mb-4 p-3 bg-light border rounded">
          <Row className="g-3">
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
            <Col xs={12} md={6}>
              <FloatingLabel controlId="pcl" label="PCL">
                <Form.Control
                  size="lg"
                  type="number"
                  value={cobro.PCL || ''}
                  onChange={handlePCLChange}
                />
              </FloatingLabel>
            </Col>
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
            <Col xs={12} md={6}>

            <Form.Select size="lg" onChange={handleQuienCobraChange} value={cobro.quien_cobra || ''}>
                <option value="">Select</option>
                <option value="">Actor</option>
                <option value="GEO">GEO</option>
                <option value="SAG">SAG</option>
                <option value="CAP">CAP</option>
                <option value="LA	">LA</option>
                <option value="IS	">IS</option>
                <option value="MVP">MVP</option>
                <option value="MSJ">MSJ</option>
                <option value="SV ">ISV</option>
                <option value="ZCC">ZCC</option>
                <option value="EA	">EA</option>
                <option value="SUCESION">SUCESION</option>              
            </Form.Select>

            </Col>
            <Col xs={12} md={3}>
              <Form.Select size="lg" onChange={handleSelectChangeTranfeOLJ} value={cobro.libranza_judicial_transferencia_directa || ''}>
                {/* <option value="">Select</option> */}
                <option value="Transferencia Directa">Transferencia Directa</option>
                <option value="Libranza Judicial">Libranza Judicial</option>
              </Form.Select>
            </Col>
            
            <Col xs={12} md={3}>
              <Form.Select size="lg" onChange={handleSelectChangeCobrado} value={cobro.cobrado_sn || 0 }>
                <option value = {Number(0)} >No Cobrado</option>
                <option value = {Number(1)} >Cobrado</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" className="px-5" onClick={handleSubmitCobro}>
              Guardar Cobro
            </Button>
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