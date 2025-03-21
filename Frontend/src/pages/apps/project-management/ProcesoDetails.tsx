import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import ProcesoDetailsSummary from 'components/modules/project-management/project-details/ProcesoDetailsSummary';
import TaskCompleted from 'components/modules/project-management/project-details/TaskCompleted';
import Estados from 'components/modules/project-management/project-details/Estados';
import WorkLoads from 'components/modules/project-management/project-details/WorkLoads';
import FileListItem from 'components/modules/project-management/todo-list/FileListItem';
import MovimientosTimeline from 'components/timelines/MovimientosTimeline';
import { activityTimelineData } from 'data/project-management/activityTimelineData';
import { attachments } from 'data/project-management/todoListData';
import { useMainLayoutContext } from 'providers/MainLayoutProvider';
import { useState, useEffect } from 'react';
import { Col, Dropdown, Row, Form } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import  axios  from 'axios'
import { useParams } from 'react-router-dom';
import { Proceso, procesoInicial } from 'data/project-management/procesos';
import { Member } from 'data/miembros';
import {NavLink} from 'react-router-dom';
import Select, { SingleValue } from 'react-select';

const ProcesoDetails = () => {

interface Resumen {
  id:string
  resumen: string
}

interface tipoDeEstado {
  tipoEstadoId: string
}

interface estado {
  tipoEstadoIdFk: string
}

// todos los useState
const [proc , setProc] = useState<Proceso>(procesoInicial);
const [mtos, setMtos] = useState([])
const [resumenes, setresumenes] = useState<Resumen>({id:'1', resumen: 'hola'})
const [tipoDeEstado, settipoDeEstado] = useState <Array<{ tipoEstadoId: string }>>([]);
const [estados, setestados] = useState <Array< string >>([])
const { id } = useParams(); // Get the id from the URL
// State to manage the visibility of the div
const [isVisible, setIsVisible] = useState(false);       

// todos los useEffect 
useEffect(() => {
  const fetchProc = async () => {  
  try{
    const response = await axios.get(`/procesos/id/${id}`)
    const data = await response.data
    setProc(data)}
  catch(error){
    console.error('ha habido un error: ', error)}
  };    
  fetchProc();
  }, [proc])

useEffect(() => {
  const fetchMtos = async () => {  
  try{
    const response = await axios.get(`/mtos/proc/${id}`)
    const data = await response.data
    setMtos(data)}
  catch(error){
    console.error('ha habido un error: ', error)}
  };    
  fetchMtos();}, 
  [mtos])

useEffect(() => {
  const fetchEstados = async () => {  
  try{
    const response = await axios.get(`/procEstM2m/proc/${id}`)
    const data = await response.data
    setestados(data)}
    catch(error){
    console.error('ha habido un error: ', error)}
  };    
  fetchEstados();}, 
  )
  
useEffect(() => {
  const fetchTEstados = async () => {  
  try{
    const response = await axios.get(`/tEstado`)
    const data = await response.data
    settipoDeEstado(data)}
  catch(error){
    console.error('ha habido un error: ', error)}
  };    
  fetchTEstados();}, 
  )

useEffect(() => {
  const fetchResumen = async () => {  
  try{
    const response = await axios.get(`/resumenes/id/${id}`)
    const data = await response.data
    setresumenes(data)}
  catch(error){
    console.error('ha habido un error: ', error)}
  };    
  fetchResumen();}, 
  [resumenes])

useEffect(() => {
  setContentClass('px-0 pt-navbar');
  return () => {
    setContentClass('');
  };
}, []);

      
// Function to toggle visibility
const handleToggle = () => {
setIsVisible(!isVisible);
};

const formatDate = (dateString: string) => {
const date = new Date(dateString);
return date.toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
}; 

const { setContentClass } = useMainLayoutContext();
const navigate = useNavigate();
const handleClick = () => {
};


type EstadoOption = { value: string; label: string };

const estadoOptions: EstadoOption[] = tipoDeEstado.map((estado) => ({
  value: estado.tipoEstadoId,
  label: estado.tipoEstadoId,
}));

const handleTEstadoSelectChange = async (selectedOption: SingleValue<EstadoOption>) => {
  if (!selectedOption) return; // Handle the case when selection is cleared
  const selectedEstado = selectedOption.value;
  try {
    await axios.post(`/procEstM2m/create`, {
      proc: id,
      estado: selectedEstado,
    });
    console.log(`Successfully updated proc ${id} with estado ${selectedEstado}`);
  } catch (error) {
    console.error('Error updating selected estado:', error);
  }
};

const resumen = resumenes.resumen;

const [isSelectVisible, setIsSelectVisible] = useState(false);

const handleButtonClick = () => {
  setIsSelectVisible(!isSelectVisible);
}

const handleArchivarButton = () => {
  axios
  .post('/procesos/archivar', { PROC: proc.PROC })
  .then((response) => {
    console.log('Update successful:', response.data);
  })
  .catch((error) => {
    console.error('Error updating:', error);
  })
  .finally(() => {
    navigate('/apps/project-management/procesos-list-view');
  });
}

const handleButtonClickNewMto = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post('/mtos/store', {
      proc: proc.PROC // Only send required fields
      // Add other fields as needed, e.g., descripcion, fecha, etc.
    });
    const newId = response.data.mtoId; // Assuming backend returns the new row or ID
    //console.log('New row created with ID:', newId);
    navigate(`/apps/project-management/movimiento/${newId}`);
  } catch (error) {
    console.error('Error creating row:', error);
  }
};

return (
<Row className="g-0">
  <Col xs={12} xxl={8} className="px-0 bg-body">
    <div className="px-4 px-lg-6 pt-6 pb-9">
      <div className="mb-5">
        <div className="d-flex justify-content-between">
          <h2 className="text-body-emphasis fw-bolder mb-2">
            {proc?.AUX8}
          </h2>
        </div>
      </div>
      <Row className="gx-0 gx-sm-5 gy-8 mb-8">
        <Col xs={12} xl={3} xxl={4} className="pe-xl-0">
          <ProcesoDetailsSummary {...proc}/>
        </Col>
  <Col xs={12} xl={9} xxl={8}> 
  <div className="d-flex flex-wrap gap-2">
  {estados.map(tag => (
  <Badge variant="tag" key={tag}>
    {tag}
  </Badge>))}
  </div>
  <br></br>
  <Select
    id="selectTipoDeEstado"
    options={estadoOptions}
    onChange={handleTEstadoSelectChange}
    placeholder="Select Estado"
    isClearable
  />
        <br></br>
        <div className='d-flex gap-2'>
          <Button variant='primary'
            /* 
            Mas adelante implementar esto, con el add de Calendar, mas completo, pero usa REDUCER y context.
            onClick={() => {
              calendarDispatch({
                type: SET_CALENDAR_STATE,
                payload: { openNewEventModal: true }
              });
            }}
            variant="primary"
            size="sm"
            startIcon={<FontAwesomeIcon icon={faPlus} className="fs-10 me-2" />} */      
            onClick={ handleButtonClickNewMto}
          >
            Agregar Movimiento </Button>
          <Button variant='primary'
          onClick={handleButtonClick}
          // {isSelectVisible ? 'Hide Select' : 'Show Select'}
          >
          Agregar Estado 
          </Button>
          <Button variant='primary' onClick={handleArchivarButton}>Archivar</Button>
      </div>

        </Col>
{/*         <Col xs={12} sm={5} lg={4} xl={3} xxl={4}>
          <WorkLoads />
        </Col>
 */}        <Col xs={12} sm={7} lg={8} xl={5}>
        <MovimientosTimeline data={mtos} />
        </Col>
      </Row>
{/*       <div>
        <h3 className="text-body-emphasis mb-4">Project overview</h3>
        <p className="text-body-secondary mb-4">
          {resumen}
        </p>
        <p>
        <NavLink to={`/apps/project-management/resumenes/${id}`} >    
      ver
      </NavLink>
      </p>
      </div>
 */}    </div>
  </Col>
</Row>
)
}
export default ProcesoDetails;
