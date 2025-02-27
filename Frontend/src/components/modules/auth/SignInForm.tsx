import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { stringify } from 'querystring';

const SignInForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {


const navigate = useNavigate();

const [usuario, setusuario] = useState <string> ('')
const [contrasena, setcontrasena] = useState <string> ('')

const handleUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setusuario(event.target.value);
};

const handlecontrasenaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setcontrasena(event.target.value);
};

const esLoginValido = (usuario: string, contrasena: string) => {

  if (  usuario == 'SilviaG' && contrasena == 'zv3ChMkg'    ||
        usuario == 'estefi' && contrasena == 'qYRYx5bY'     ||
        usuario == 'FamFam' && contrasena == 'F4hbZRBG'     ||
        usuario == 'ivanaSmi' && contrasena == 'RmRBh6QQ'   ||
        usuario == 'ivanaSVa' && contrasena == '7z53HSEL'   ||
        usuario == 'LorenaAC' && contrasena == 'AgEQ9DgJ'   ||
        usuario == 'marinaJ' && contrasena == 'dkpbS3AF'    ||
        usuario == 'ZoeCandela' && contrasena == 'kR2PYKjg' ||
        usuario == 'dylan' && contrasena == '7eKsE8rf'      ||
        usuario == 'skrillex' && contrasena == 'genioMundial' 
    )
    {return true}
    else{
      return false
    }

}
const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault(); // Prevent default form submission
  if (esLoginValido(usuario, contrasena))
  {
    localStorage.setItem('usuario', usuario)
    let id: string = '';
    switch(usuario) {
      case'SilviaG':
        id = '5yURv0uW0H'
    }
    try {
      const response = await axios.get(`http://localhost:2000/miembros/id/${id}`)
      const data = await response.data
      localStorage.setItem('iniciales', data.Iniciales)
      localStorage.setItem('miemID', data.miemID)
      navigate('/apps/project-management/procesos-list-view')
    } 
    catch (error) {
      console.error('Error updating:', error);
    }
  }
  else {
    setusuario('')
    setcontrasena('')
    alert('ingrese credenciales validas')
  }
};

return (
  <>
    <div className="text-center mb-7">
      <h3 className="text-body-highlight">Registrarse</h3>
    </div>
    <Form.Group className="mb-3 text-start">
      <Form.Label htmlFor="email">Usuario</Form.Label>
      <div className="form-icon-container">
        <Form.Control
          id="user"
          type="user"
          className="form-icon-input"
          placeholder="usuario"
          value={usuario}
          onChange={handleUsuarioChange}

        />
        <FontAwesomeIcon icon={faUser} className="text-body fs-9 form-icon" />
      </div>
    </Form.Group>
    <Form.Group className="mb-3 text-start">
      <Form.Label htmlFor="password">Contraseña</Form.Label>
      <div className="form-icon-container">
        <Form.Control
          id="password"
          type="password"
          className="form-icon-input"
          placeholder="Contraseña"
          value={contrasena}
          onChange={handlecontrasenaChange}
        />
        <FontAwesomeIcon icon={faKey} className="text-body fs-9 form-icon" />
      </div>
    </Form.Group>
    <Row className="flex-between-center mb-7">
      <Col xs="auto">
        <Form.Check type="checkbox" className="mb-0">
          <Form.Check.Input
            type="checkbox"
            name="remember-me"
            id="remember-me"
            defaultChecked
          />
          <Form.Check.Label htmlFor="remember-me" className="mb-0">
            Recordarme
          </Form.Check.Label>
        </Form.Check>
      </Col>

    </Row>
    <Button variant="primary" className="w-100 mb-3"    onClick={handleSubmit}
    >
      Enviar
    </Button>
  </>
);
};

export default SignInForm;
