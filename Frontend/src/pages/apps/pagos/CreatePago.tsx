import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { pagoInicial, Pago } from 'data/pagos/pago';
import { TipoDeGasto, tipoDeGastoInicial } from 'data/pagos/tipoDeGasto';

const CreatePago = () => {
  const navigate = useNavigate();
  const [pago, setPago] = useState<Pago>(pagoInicial);
  const [tiposDeGastos, setTiposDeGastos] = useState<TipoDeGasto[]>([]);

  // Fetch tiposDeGastos
  useEffect(() => {
    const fetchTGasto = async () => {
      try {
        const response = await axios.get('/gastos');
        console.log('Fetched tipos de gastos:', response.data);
        setTiposDeGastos(response.data);
      } catch (error) {
        console.error('Error fetching tipos de gastos:', error);
      }
    };
    fetchTGasto();
  }, []);

  // Handlers for each field
  const handleTGastoSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedTipo = tiposDeGastos.find(tipo => tipo.gasto === selectedValue) || tipoDeGastoInicial;
    setPago(prev => ({
      ...prev,
      gastoIdFkEnPagos: selectedTipo.gastoId,
      concepto: selectedTipo.gasto,
      pagoLabel: `${selectedTipo.gasto} - ${prev.fechadepago || new Date().toISOString().split('T')[0]}`
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
        pagoLabel: `${prev.concepto || 'Pago'} - ${formattedDate}`
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

  // Submit handler
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const confirmSave = window.confirm(
      `Estás guardando un pago: ${pago.pagoLabel}\nImporte: $${pago.importe}\nEstado: ${pago.estado}\n¿Confirmas?`
    );

    if (!confirmSave) {
      console.log('Pago save cancelled');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('gastoIdFkEnPagos', pago.gastoIdFkEnPagos);
      formData.append('concepto', pago.concepto);
      formData.append('importe', String(pago.importe));
      formData.append('fechaDeCarga', new Date().toISOString());
      formData.append('aclaracion', pago.aclaracion || '');
      formData.append('estado', pago.estado || 'Pendiente');
      formData.append('paga', pago.paga || '');
      formData.append('fechadepago', new Date().toISOString());
      formData.append('usuario', localStorage.getItem('iniciales') || 'unknown');

      // Append files if they exist
      if (pago.factura instanceof File) formData.append('factura', pago.factura);
      if (pago.documento instanceof File) formData.append('documento', pago.documento);
      if (pago.comprobante instanceof File) formData.append('comprobante', pago.comprobante);

      console.log('Sending pago:', Object.fromEntries(formData));
      const response = await axios.post('/pagos/store', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Pago created with ID:', response.data);
      navigate('/apps/pagos/pagos-list-view'); // Adjust route as needed
    } catch (error) {
      console.error('Error creating pago:', (error as AxiosError).response?.data || (error as AxiosError).message);
    }

    if (pago.estado === 'Pagado') {
      const cajaData = {
        monto: pago.importe || 0,
        categoria: 'Pago', // Adjust as needed
        usuario: localStorage.getItem('iniciales') || 'unknown',
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
          <FloatingLabel label="Tipo de Gasto">
            <Form.Select size="lg" onChange={handleTGastoSelectChange} value={pago.concepto || ''}>
              <option value="">Seleccione Tipo de Gasto</option>
              {tiposDeGastos.map(tipo => (
                <option key={tipo.gastoId} value={tipo.gasto}>
                  {tipo.gasto}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Importe">
            <Form.Control
              size="lg"
              type="number"
              value={pago.importe || ''}
              onChange={handleImporteChange}
            />
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Estado">
            <Form.Select size="lg" onChange={handleEstadoChange} value={pago.estado || ''}>
              <option value="Pendiente">Pendiente</option>
              <option value="CAP entrega a FAM">CAP entrega a FAM</option>
              <option value="Pagado">Pagado</option>
              <option value="No Pagamos">No Pagamos</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Quien Paga">
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
              <option value="SV">ISV</option>
              <option value="ZCC">ZCC</option>
              <option value="EA">EA</option>
              <option value="SUCESION">SUCESION</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
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
                <label htmlFor="fechadepago">Fecha de Pago</label>
              </Form.Floating>
            )}
          />
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Aclaración">
            <Form.Control
              as="textarea"
              size="lg"
              value={pago.aclaracion || ''}
              onChange={handleAclaracionChange}
              style={{ height: '100px' }}
            />
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Factura">
            <Form.Control
              type="file"
              size="lg"
              onChange={handleFileChange('factura')}
            />
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Documento">
            <Form.Control
              type="file"
              size="lg"
              onChange={handleFileChange('documento')}
            />
          </FloatingLabel>
        </Col>

        <Col sm={6} md={4}>
          <FloatingLabel label="Comprobante">
            <Form.Control
              type="file"
              size="lg"
              onChange={handleFileChange('comprobante')}
            />
          </FloatingLabel>
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

      {/* Display for debugging */}
      <div>
        <p>Pago: {pago.pagoLabel}</p>
        <p>Gasto ID: {pago.gastoIdFkEnPagos}</p>
        <p>Concepto: {pago.concepto}</p>
        <p>Importe: $ {pago.importe}</p>
        <p>Fecha de Carga: {pago.fechaDeCarga || new Date().toISOString()}</p>
        <p>Aclaración: {pago.aclaracion}</p>
        <p>Estado: {pago.estado}</p>
        <p>Quien Paga: {pago.paga}</p>
        <p>Fecha de Pago: {pago.fechadepago?.toString()}</p>
        <p>Usuario: {pago.usuario || localStorage.getItem('iniciales')}</p>
      </div>
    </div>
  );
};

export default CreatePago;