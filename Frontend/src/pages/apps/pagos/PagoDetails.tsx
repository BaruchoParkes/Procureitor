import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { pagoInicial, Pago } from 'data/pagos/pago';
import { Form, Col } from 'react-bootstrap';
import { useAuth } from 'providers/AuthProvider';

const PagoDetails = () => {
  const [pago, setPago] = useState<Pago>(pagoInicial);
  const { id } = useParams();
  const { user } = useAuth();  
  const [estado, setEstado] = useState(pago.estado);


  useEffect(() => {
    const fetchPago = async () => {
      try {
        const response = await axios.get(`/pagos/id/${id}`);
        const data = await response.data;
        console.log('Fetched pago:', data);
        setPago(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPago();
  }, [id]);

  const baseURL = 'http://localhost:2000';

  // Helper function to build URL safely
  const getFileUrl = (file: string | File | null | undefined): string | null => {
    if (typeof file === 'string') {
      return `${baseURL}/${file.replace(/\\/g, '/')}`;
    }
    return null; // Skip File objects or null/undefined
  };

  // Helper function to determine file type based on extension
  const getFileType = (url: string | null): string => {
    if (!url) return 'unknown';
    const extension = url.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension || '')) return 'image';
    if (extension === 'pdf') return 'pdf';
    return 'other'; // For other file types (e.g., doc, txt)
  };

  const facturaURL = getFileUrl(pago.factura);
  const comprobanteURL = getFileUrl(pago.comprobante);

  const handleFileChange = (field:  'comprobante') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPago(prev => ({ ...prev, [field]: file }));
    }
  };


  /* const handleEstadoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEstado = event.target.value;
    setEstado(newEstado);
    const pagoId = id
    try {
      const usuario = user?.iniciales;
      await axios.put(`/pagos/update/${pagoId}`, {
        pagoId,
        estado: newEstado,
        usuario,
        },
        );
    } catch (error) {
      console.error('Error updating estado:', (error as AxiosError).response?.data || error);
    } finally {
      setPago(prev =>({...prev, estado: newEstado}))
    }
  };
 */

  const handleEstadoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEstado = event.target.value;
    console.log('newEstado', newEstado)
    setEstado(newEstado);
    const pagoId = id;
    const usuario = user?.iniciales;
  
    try {
      const formData = new FormData();
      formData.append("pagoLabel", pago.pagoLabel);
      formData.append("estado", newEstado);
      formData.append("usuario", usuario || "");
      formData.append('pagoId', id || "");
      formData.append('paga', "");
      formData.append('concepto', pago.concepto|| "");
      formData.append('importe', String(pago.importe) || "");


      
      // Append file only if it exists
      if (pago.comprobante instanceof File) {
        formData.append("comprobante", pago.comprobante);
      }
  
      console.log("Updating Pago with ID:", id);
      console.log("Updating Pago with pagoId:", pagoId);



      await axios.put(`/pagos/update2/${pagoId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Estado updated successfully");
    } catch (error) {
      console.error("Error updating estado:", (error as AxiosError).response?.data || error);
    } finally {
      setPago(prev => ({ ...prev, estado: newEstado }));
    }
  };

  // Render file based on its type
  const renderFile = (url: string | null, label: string) => {
    if (!url) return null;

    const fileType = getFileType(url);

    return (
      <div>
        <p>{label}:</p>
        {fileType === 'image' && (
          <img
            src={url}
            alt={label}
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => console.error(`${label} load error:`, e)}
          />
        )}
        {fileType === 'pdf' && (
          <embed
            src={url}
            type="application/pdf"
            width="100%"
            height="600px"
            style={{ border: '1px solid #ccc' }}
          />
        )}
        {fileType === 'other' && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Download {label}
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      <form>
        <p>Pago: {pago.pagoLabel}</p>
        <p>Aclaración: {pago.aclaracion}</p>
        <p>Fecha de Carga: {pago.fechaDeCarga}</p>
        <p>id: {pago.pagoId}</p>
        <p>Concepto: {pago.concepto}</p>
        <p>Importe: $ {pago.importe}</p>
        <p>Estado: {pago.estado}</p>
        <p>Quien Paga: {pago.paga}</p>
        <p>Fecha de Pago: {pago.fechadepago?.toString()}</p>
        
        <Col sm={6} md={4}>
        <Form.Group controlId="comprobante" className="mb-3">
          <Form.Label>Comprobante de Pago</Form.Label>
            <Form.Control type="file" size="lg" onChange={handleFileChange('comprobante')} />
        </Form.Group>        
        </Col>

        {pago.estado === 'Pagado' ? (
        <span>{pago.estado}</span>
      ) : (
        <Form.Select size="lg" onChange={handleEstadoChange} value={estado}>
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="CAP entrega a FAM">CAP entrega a FAM</option>
        </Form.Select>
      )}
      </form>
      <div>
        {renderFile(facturaURL, 'Factura')}
        {renderFile(comprobanteURL, 'Comprobante')}
      </div>
    </>
  );
};

export default PagoDetails;