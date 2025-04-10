import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { pagoInicial, Pago } from 'data/pagos/pago';

const PagoDetails = () => {
  const [pago, setPago] = useState<Pago>(pagoInicial);
  const { id } = useParams();

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

  const facturaURL = getFileUrl(pago.factura);
  const documentoURL = getFileUrl(pago.documento);
  const comprobanteURL = getFileUrl(pago.comprobante);

  console.log('facturaURL:', facturaURL);

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
      </form>

      <div>
        {facturaURL && (
          <div>
            <p>Factura:</p>
            <img
              src={facturaURL}
              alt="Factura"
              style={{ maxWidth: '100%', height: 'auto' }}
              onError={(e) => console.error('Image load error:', e)}
            />
          </div>
        )}
        {documentoURL && (
          <div>
            <p>Documento:</p>
            <img src={documentoURL} alt="Documento" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        {comprobanteURL && (
          <div>
            <p>Comprobante:</p>
            <img src={comprobanteURL} alt="Comprobante" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default PagoDetails;