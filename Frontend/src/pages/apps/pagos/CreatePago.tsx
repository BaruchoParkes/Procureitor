import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import { Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { pagoInicial, Pago } from 'data/pagos/pago';
import { TipoDeGasto, tipoDeGastoInicial } from 'data/pagos/tipoDeGasto';
import { useAuth } from 'providers/AuthProvider';
import { Proceso } from 'data/project-management/procesos';

const CreatePago = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [pago, setPago] = useState<Pago>(pagoInicial);
  const [tiposDeGastos, setTiposDeGastos] = useState<TipoDeGasto[]>([]);
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [loaded, setLoaded] = useState(false);


  // Fetch tiposDeGastos
  useEffect(() => {
    const fetchTGasto = async () => {
      try {
        const response = await axios.get('/gastos');
        setTiposDeGastos(response.data);
      } catch (error) {
        console.error('Error fetching tipos de gastos:', error);
      }
    };
    fetchTGasto();
  }, []);

  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Get day, pad with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-11, so +1), pad with leading zero
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
    return `${day}-${month}-${year}`;
  };
  
  const fetchProcesos = async () => {
    if (!loaded) { // Only fetch if data hasn't been loaded
      try {
        const response = await axios.get(`/procesos/procesoscjson`);
        setProcesos(response.data);
        setLoaded(true); // Mark as loaded to prevent repeated requests
      } catch (error) {
        console.error('Error fetching procesos:', error);
      }
    }
  };

  // Handlers for each field
  const handleTGastoSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedTipo = tiposDeGastos.find(tipo => tipo.gasto === selectedValue) || tipoDeGastoInicial;

    setPago(prev => ({
      ...prev,
      gastoIdFkEnPagos: selectedTipo.gastoId,
      concepto: selectedTipo.gasto,
      categoria: selectedTipo.concepto,
      pagoLabel: `${selectedTipo.gasto} - ${getFormattedDate()} - usuario: ${user?.iniciales}`
    }));
  };

  const handleImporteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPago(prev => ({ ...prev, importe: Number(event.target.value) || 0 }));
  };

  const handleAclaracionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPago(prev => ({ ...prev, aclaracion: event.target.value }));
  };

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEstado = event.target.value;
    const newFechadepago = newEstado === 'Pagado' ? new Date().toISOString().split('T')[0] : pago.fechadepago;
    setPago(prev => ({
      ...prev,
      estado: newEstado,
      fechadepago: newFechadepago,
      pagoLabel: `${prev.concepto || 'Pago'} - ${newFechadepago}`
    }));
  };

  const handlePagaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPago(prev => ({ ...prev, paga: event.target.value }));
  };

  const handleFechadepagoChange = (dates: Date[]) => {
    const date = dates && dates.length > 0 ? dates[0] : null;
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setPago(prev => ({
        ...prev,
        fechadepago: formattedDate,
        pagoLabel: `${prev.concepto || 'Pago'} - ${getFormattedDate()}`
      }));
    } else {
      setPago(prev => ({
        ...prev,
        fechadepago: '',
        pagoLabel: `${prev.concepto || 'Pago'} - `
      }));
    }
  };

  const handleFileChange = (field: 'factura' | 'documento' | 'comprobante') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPago(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleProcesoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    function shortenString(str: string) {
      const match = str.match(/^(\S+)\s.*\sC\/\s(\S+).*\/S\/\s(\S+)/);
      return match ? `${match[1]} C/ ${match[2]} S/ ${match[3]}` : "";
  }
  
    const newLabel = pago.pagoLabel + event.target.value
    setPago(prev => ({ ...prev, pagoLabel: newLabel, proceso: event.target.value }));
  };

  // Submit handler
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const confirmSave = window.confirm(
      `Estás guardando un pago: ${pago.pagoLabel}\nImporte: $${pago.importe}\nEstado: ${pago.estado}\n \n proceso: $${pago.proceso}\n¿Confirmas?`
    );

    if (!confirmSave) {
      console.log('Pago save cancelled');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('label', pago.pagoLabel);
      formData.append('gastoIdFkEnPagos', pago.gastoIdFkEnPagos);
      formData.append('concepto', pago.concepto);
      formData.append('importe', String(pago.importe));
      formData.append('fechaDeCarga', new Date().toISOString());
      formData.append('aclaracion', pago.aclaracion || '');
      formData.append('estado', pago.estado || 'Pendiente');
      formData.append('paga', pago.paga || '');
      formData.append('fechadepago', new Date().toISOString());
      formData.append('usuario', user?.iniciales || 'unknown');
      formData.append('pagoLabel', pago.pagoLabel || 'unknown');
      formData.append('proceso', pago.proceso || 'unknown');

      // Append files if they exist
      if (pago.factura instanceof File) formData.append('factura', pago.factura);
      if (pago.documento instanceof File) formData.append('documento', pago.documento);
      if (pago.comprobante instanceof File) formData.append('comprobante', pago.comprobante);

      const response = await axios.post('/pagos/store', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Pago created with ID:', response.data);
      pago.pagoId = response.data;
      navigate('/apps/pagos/pagos-generales-list-view'); // Adjust route as needed
    } catch (error) {
      console.error('Error creating pago:', (error as AxiosError).response?.data || (error as AxiosError).message);
    }

    if (pago.estado === 'Pagado') {
      const cajaData = {
        monto: pago.importe * (-1)|| 0,
        categoria: pago.categoria, // Adjust as needed
        nombre: pago.pagoLabel,
        usuario: user?.iniciales || 'unknown',
        pagos_fk: pago.pagoId,
        cobro_pago: 'p',
        notas: pago.aclaracion,
        caja: pago.paga,
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

  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Crear un Pago: {pago.pagoLabel}</h2>
      <Row as="form" className="g-3 mb-6">
        <Col sm={6} md={4}>
          <Form.Label> Tipo de Gasto</Form.Label>
            <Form.Select size="lg"  onChange={handleTGastoSelectChange} value={pago.concepto || ''}>
              <option value="">Seleccione Tipo de Gasto</option>
              {tiposDeGastos.map(tipo => (
                <option key={tipo.gastoId} value={tipo.gasto}>
                  {tipo.gasto}
                </option>
              ))}
            </Form.Select>
        </Col>

        <Col sm={6} md={4}>
          <Form.Label>Importe</Form.Label> 
            <Form.Control
              size="lg"
              type="number"
              value={pago.importe || ''}
              onChange={handleImporteChange}
            />
        </Col>

        <Col sm={6} md={4}>
          <Form.Label>Estado</Form.Label>
            <Form.Select size="lg" onChange={handleEstadoChange} value={pago.estado || ''}>
              <option value="Pendiente">Pendiente</option>
              <option value="CAP entrega a FAM">CAP entrega a FAM</option>
              <option value="Pagado">Pagado</option>
              <option value="No Pagamos">No Pagamos</option>
            </Form.Select>
        </Col>

        <Col sm={6} md={4}>
          <Form.Label>Quien Paga</Form.Label>
            <Form.Select size="lg" onChange={handlePagaChange} value={pago.paga || ''}>
              <option value="">Select</option>
              <option value="">Actor</option>
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

        <Col sm={6} md={4}>
        <Form.Label>Fecha de Pago</Form.Label>
          <DatePicker
            value={pago.fechadepago ? new Date(pago.fechadepago) : new Date()}
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

        <Col sm={6} md={4}>
        <Form.Group controlId="factura" className="mb-3">
          <Form.Label>Factura</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleFileChange('factura')} />
        </Form.Group>        
        </Col>

        <Col sm={6} md={4}>
        <Form.Group controlId="comprobante" className="mb-3">
          <Form.Label>Comprobante</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleFileChange('comprobante')} />
        </Form.Group>        
        </Col>

        <Col sm={6} md={4}>
          <Form.Label> Proceso</Form.Label>
          <Form.Select size="lg" onFocus={fetchProcesos} onChange={handleProcesoChange} value={pago.proceso || ''}>
  <option value="">Seleccione un Proceso</option>
  {procesos.map(proceso => (
    <option key={proceso.PROC} value={proceso.PROC}>
      {proceso.AUX8}
    </option>
  ))}
</Form.Select>

        </Col>

        <Col sm={6} md={4}>
          <Form.Label>Aclaración</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              value={pago.aclaracion || ''}
              onChange={handleAclaracionChange}
              //style={{ height: '100px' }}
            />
        </Col>

        <Col xs={12} className="d-flex justify-content-end gap-3">
          <Button variant="secondary" className="px-5" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="primary" className="px-5" onClick={handleSubmit}>
            Guardar Pago
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CreatePago;