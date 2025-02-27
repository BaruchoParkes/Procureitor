import Button from 'components/base/Button';
import DatePicker from 'components/base/DatePicker';
import ReactSelect from 'components/base/ReactSelect';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom'
import { Movimiento } from 'data/project-management/Movimiento';
import  axios  from 'axios'
import { TextEditor } from 'components/Cap/TextEditor';


const ResumenComponent = () => {


  const { id } = useParams(); // Get the id from the URL

  interface Resumen {
    id:string
    resumen: string
  }
  
  const aidi = id;

  const [resumenes, setresumenes] = useState<Resumen>({id:'1', resumen:'hola'})

  const [resumen, setresumen] = useState<string>('hola')


  useEffect(() => {
    const fetchResumen = async () => {  
    try{
      const response = await axios.get(`http://localhost:2000/resumenes/id/${id}`)
      const data = await response.data
      setresumenes(data)}
    catch(error){
      console.error('ha habido un error: ', error)}
    };    
    fetchResumen();}, 
    [])


  const handleTextChange = (newValue: string) => {
    setresumen(newValue);
    console.log('resumen: ', newValue);
  };
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:2000/resumenes/update', {
        id: aidi, 
        resumenes: resumen,  
      });
      console.log('Update successful:', response);
      console.log('resumenes:', resumen);
      console.log('aidi:', aidi);

      Navigate 
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div>          
        <TextEditor text = '' titulo = '' cuerpo={resumenes.resumen} autos='' handleTextChange={handleTextChange} />
            
            <Col xs={12} className="gy-6">
              <div className="d-flex justify-content-end gap-3">
                <Button variant="phoenix-primary" className="px-5">
                  Cancel
                </Button>
                <Button variant="primary" className="px-5 px-sm-15"
                  type="submit" 
                  onClick={handleSubmit}>
                  Guardar
                </Button>
              </div>
            </Col>
          
    </div>
  );
};

export default ResumenComponent;
