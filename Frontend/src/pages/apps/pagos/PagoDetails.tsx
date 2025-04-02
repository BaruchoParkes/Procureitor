import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import ReactSelect from 'components/base/ReactSelect';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Badge from 'components/base/Badge';
import ProjectDetailsSummary from 'components/modules/project-management/project-details/ProjectDetailsSummary';
import TaskCompleted from 'components/modules/project-management/project-details/TaskCompleted';
import Estados from 'components/modules/project-management/project-details/Estados';
import WorkLoads from 'components/modules/project-management/project-details/WorkLoads';
import FileListItem from 'components/modules/project-management/todo-list/FileListItem';
import MovimientosTimeline from 'components/timelines/MovimientosTimeline';
import { activityTimelineData } from 'data/project-management/activityTimelineData';
import { attachments } from 'data/project-management/todoListData';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import  axios  from 'axios'
import { useParams } from 'react-router-dom';
import {pagoInicial, Pago} from 'data/pagos/pago';
import { Miembro } from 'data/miembros';
import {NavLink} from 'react-router-dom';
import Select, { SingleValue } from 'react-select';




const PagoDetails = () => {

  const [pago, setpago] = useState<Pago>(pagoInicial)
  const { id } = useParams(); // Get the id from the URL

  useEffect(() => {
    const fetchPago = async () => {  
    try{
      const response = await axios.get(`/pagos/id/${id}`)
      const data = await response.data
      setpago(data)}
    catch(error){
      console.error('ha habido un error: ', error)}
    };    
    fetchPago();
    }, )

    const [pagoLabel, setpagoLabel] = useState('')
    const [gastoIdFkEnPagos, setgastoIdFkEnPagos] = useState('')
    const [concepto, setconcepto] = useState('')
    const [importe, setimporte] = useState('')
    const [aclaracion, setaclaracion] = useState('')
    const [estado, setestado] = useState('')
    const [paga, setpaga] = useState('')
    const [fechadepago, setfechadepago] = useState('')
    const [factura, setfactura] = useState('')
    const [documento, setdocumento] = useState('')
    const [comprobante, setcomprobante] = useState('')
        

  return (<>

  <form>
    <p>Pago:  {pago.pagoLabel} </p>
    <p>Aclaración: {pago.aclaracion}</p>
    <p>Fecha de Carga: {pago.fechaDeCarga}</p>
    <p>id: {pago.pagoId} </p>
    <p>Concepto: {pago.concepto} </p>
    <p>Importe: $ {pago.importe} </p>
    <p>Estado: {pago.estado}</p>
    <p>Quien Paga : {pago.paga}</p>
    <p>Fecha de Pago: {pago.fechadepago?.toString()}</p>
  </form>


  </>)
}


export default PagoDetails;

