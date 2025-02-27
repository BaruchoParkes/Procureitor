import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import ReactSelect from 'components/base/ReactSelect';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { Movimiento } from 'data/project-management/Movimiento';
import { TipoDeMovimiento , tipoDeMtoInicial}  from 'data/project-management/tipoDeMovimiento';
import  axios  from 'axios'
import { TextEditor } from 'components/Cap/TextEditor';
import { HotKeys } from 'react-hotkeys';

const MovimientoComponent = () => {
  

/* const formatDate = (dateString: Date) => {
  const date = new Date(dateString);

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}; */

let today: Date = new Date()

const movimientoInicial: Movimiento = {
  mtoId: 1437,
  proc: "5yURv&mC0q",
  createdAt: today,
  fechaDeRealizacion: today,
  tipoDeMovimiento: "",
  Responsable: "",
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
  Miembro: ""
}

const navigate = useNavigate();
const [mto, setMto] = useState<Movimiento> (movimientoInicial)
const { id } = useParams(); // Get the id from the URL
const [texto, setTexto] = useState('Sr Juez: PARKES CRISTIAN ANDRES')
const [descripcion, setDescripcion] = useState('')
const [fecha, setfecha] = useState<Date>(today)
const [realizado, setrealizado] = useState<number>(1)
const [tmto, settmto] = useState<TipoDeMovimiento>(tipoDeMtoInicial)
const [tipos, setTipos] = useState<TipoDeMovimiento[]>([])



useEffect(() => {
  const fetchMto = async () => {  
    try{
      const response = await axios.get(`http://localhost:2000/mtos/id/${id}`)
      const data = await response.data
      setMto(data)
      }
    catch(error){
      console.error('ha habido un error: ', error)
      }
  };    
fetchMto();
}, [id, mto]), 

useEffect(() => {
  const fetchTMto = async () => {  
      try{
        const response = await axios.get(`http://localhost:2000/tMtos`)
        const data = await response.data
        setTipos(data)
        }
      catch(error){
        console.error('ha habido un error: ', error)
        }
    };    
fetchTMto();
}, [id])  

useEffect(() => {
if (mto.descripcion) {
  setDescripcion(mto.descripcion);
}
}, [mto]);

useEffect(() => {
  if (mto.texto) {
    setTexto(mto.texto);
  }
}, [mto]);

useEffect(() => {
  if (mto.fechaDeRealizacion) {
    setfecha(mto.fechaDeRealizacion);
  }
}, [mto]); 

const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedDate = new Date(event.target.value); // Convert the string to a Date
  setfecha(selectedDate);
  console.log('fecha: ', selectedDate);
};

const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setDescripcion(event.target.value);
};

const handleTextChange = (newValue: string) => {
  setTexto(newValue);
  console.log('texto: ', newValue);
};

const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = event.target.value;
  // Set "realizado" to 1 for "Realizado" and 0 for "Pendiente"
  if (selectedValue === 'Realizado') {
    setrealizado(1);
  } else if (selectedValue === 'Pendiente') {
    setrealizado(0);
  }
};

const handleTMtoSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedValue = event.target.value;
  console.log('Selected TipoDeMovimiento:', selectedValue);
  // Update the selected tipoDeMovimiento
  settmto(tipos.find(tipo => tipo.movimiento === selectedValue) || tipoDeMtoInicial);
};

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); // Prevent default form submission
  try {
      await axios.post('http://localhost:2000/mtos/update', {
      id: mto.mtoId, 
      descripcion: descripcion,  
      texto: texto,
      realizado,
      fechaDeRealizacion: fecha
    });
    navigate(-1)
  } catch (error) {
    console.error('Error updating:', error);
  }

};

let autos: string = mto.Proc.ACTO+' C/ '+mto.Proc.DEMA

  return (
    <div>
    <h2 className="mb-4">Movimiento en {autos}</h2>

    <Row className="align-items-center mb-3"> {/* Align items vertically */}
      <Col xs={12} xl={9} className="mb-3 mb-xl-0"> {/* Add margin for smaller screens */}
        <Form.Control size="lg" type='date' onChange={handleFechaChange} />
      </Col>
{/*       select para tipoDeMovimiento
 */}      
      <Col xs={12} sm={6} xl={3}> {/* Control widths across different screen sizes */}
            {/* select realizado-pendiente (default = realizado) */}

        <Form.Select size="lg" onChange={handleSelectChange}>
          <option>Realizado</option>
          <option>Pendiente</option>
        </Form.Select>
      </Col>
    </Row>

    <Row>
        <Col sm={12} md={8} className="mb-3">
          <Form.Select id="tipoDeMtoSelect" size="lg" onChange={handleTMtoSelectChange}>
            {tipos.map(tipo => (
              <option key={tipo.tipoMtoID} value={tipo.movimiento}>{tipo.movimiento}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      
    <Row as="form" className="g-3 mb-6">
      <Col sm={12} md={8} className="mb-3"> {/* Add spacing between components */}
        <Form.Control 
          size="lg"
          type="text" 
          value={descripcion} 
          onChange={handleDescripcionChange} 
          placeholder="Descripción" 
        />
      </Col>
    </Row>
    <div>
    <Row style={{height: '300px'}}>
      <Col xs={12} className="mb-3">
        <TextEditor text={texto} titulo={tmto.tituloEscrito} cuerpo ={tmto.cuerpoEscrito} autos={autos} handleTextChange={handleTextChange} />
      </Col>
    </Row>
    </div>
    <div style={{position: 'static'}}>
    <Row style={{position: 'static'}}>
      <Col xs={12} className="d-flex justify-content-end gap-3">
        <Button variant="secondary" className="px-5">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          className="px-5 px-sm-15" 
          type="submit" 
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Col>
      </Row>
      </div>
  </div>
  );
};

export default MovimientoComponent;
