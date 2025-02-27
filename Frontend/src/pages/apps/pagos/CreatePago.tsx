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
import { Member } from 'data/miembros';
import {NavLink} from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { TipoDeGasto, tipoDeGastoInicial } from 'data/pagos/tipoDeGasto';


const CreatePago = () => {


    const [pago, setpago] = useState<Pago>(pagoInicial)
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
    //const [tiposDeGastos, settiposDeGastos] = <Array<{ gastoId: string, gasto: string, concepto: string }>> ([]);

    {/* type GastoOption = { value: string; label: string };

    const gastoOptions: GastoOption[] = tiposDeGastos.map((estado) => ({
      value: estado.tipoEstadoId,
      label: estado.tipoEstadoId,
    })); */}


    /* useEffect(() => {
      const fetchTGasto = async () => {  
          try{
            const response = await axios.get(`http://localhost:2000/gastos`)
            const data = await response.data
            settiposDeGastos(data)
            }
          catch(error){
            console.error('ha habido un error: ', error)
            }
        };    
    fetchTGasto();
    }, )   */
        

  return (<>

    <p>Pago:  {pago.pagoLabel} </p>
    <p>Aclaración: {pago.aclaracion}</p>
    <p>Fecha de Carga: {pago.fechaDeCarga}</p>
    <p>id: {pago.pagoId} </p>
    <p>Concepto: {pago.concepto} </p>
    <p>Importe: $ {pago.importe} </p>
    <p>Estado: {pago.estado}</p>
    <p>Quien Paga : {pago.paga}</p>
    <p>Fecha de Pago: {pago.fechadepago}</p>


    <div>
      <h2 className="mb-4">Crear un Pago: {pago.pagoLabel} </h2>
      <Row>
        <Col xs={12} xl={9}>
          <Row as="form" className="g-3 mb-6">
            <Col sm={6} md={8}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Project title"
              >
                <Form.Control type="text" placeholder="Project title" />
              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <FloatingLabel
                controlId="floatingSelectTask"
                label="Defult task view"
              >
                {/* <Select
                  id="selectGasto"
                  options={gastoOptions}
                  onChange={handleGastoSelectChange}
                  placeholder="Seleccione Gasto"
                  isClearable
                /> */}

              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <FloatingLabel
                controlId="floatingSelectPrivacy"
                label="Project privacy"
              >
                <Form.Select>
                  <option>Select privacy</option>
                  <option value="1">Data Privacy One</option>
                  <option value="2">Data Privacy Two</option>
                  <option value="3">Data Privacy Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <FloatingLabel controlId="floatingSelectTeam" label="Team">
                <Form.Select>
                  <option>Select team</option>
                  <option value="1">Team One</option>
                  <option value="2">Team Two</option>
                  <option value="3">Team Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <FloatingLabel controlId="floatingSelectAssignees" label="People">
                <Form.Select>
                  <option>Select assignees</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <FloatingLabel
                controlId="floatingSelectAdmin"
                label="Project Lead"
              >
                <Form.Select>
                  <option>Select admin</option>
                  <option value="1">Data Privacy One</option>
                  <option value="2">Data Privacy Two</option>
                  <option value="3">Data Privacy Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col sm={6} md={4}>
              <DatePicker
                render={(_, ref) => {
                  return (
                    <Form.Floating>
                      <Form.Control
                        type="text"
                        placeholder="Project title"
                        ref={ref}
                        id="startDate"
                      />
                      <label htmlFor="startDate" className="ps-6">
                        Start date
                      </label>
                    </Form.Floating>
                  );
                }}
              />
            </Col>
            <Col sm={6} md={4}>
              <DatePicker
                render={(_, ref) => {
                  return (
                    <Form.Floating>
                      <Form.Control
                        type="date"
                        placeholder="Deadline"
                        ref={ref}
                        id="deadline"
                      />
                      <label htmlFor="deadline" className="ps-6">
                        Deadline
                      </label>
                    </Form.Floating>
                  );
                }}
              />
            </Col>
            <Col xs={12} className="gy-6">
              <FloatingLabel
                controlId="floatingProjectOverview"
                label="Project overview"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            </Col>
            <Col md={6} className="gy-6">
              <FloatingLabel controlId="floatingSelectClient" label="Client">
                <Form.Select>
                  <option>Select client</option>
                  <option value="1">Client One</option>
                  <option value="2">Client Two</option>
                  <option value="3">Client Three</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md={6} className="gy-6">
              <FloatingLabel controlId="floatingInputBudget" label="Budget">
                <Form.Control type="text" placeholder="Budget" />
              </FloatingLabel>
            </Col>
            <Col xs={12} className="gy-6">
              <ReactSelect
                isMulti
                placeholder="Add tags"
                options={[
                  { value: 'Biology', label: 'Biology' },
                  { value: 'Brainlessness', label: 'Brainlessness' },
                  { value: 'Jerry', label: 'Jerry' },
                  { value: 'Neurology', label: 'Neurology' },
                  { value: 'Not_the_mouse', label: 'Not_the_mouse' },
                  { value: 'Rick', label: 'Rick' },
                  { value: 'Stupidity', label: 'Stupidity' }
                ]}
                classNames={{
                  control: () => 'py-3',
                  valueContainer: () => 'lh-1'
                }}
              />
            </Col>
            <Col xs={12} className="gy-6">
              <div className="d-flex justify-content-end gap-3">
                <Button variant="phoenix-primary" className="px-5">
                  Cancel
                </Button>
                <Button variant="primary" className="px-5 px-sm-15">
                  Create Project
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    </>
  );
};

  


export default CreatePago;
