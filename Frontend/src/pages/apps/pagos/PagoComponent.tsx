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


const PagoComponent = () => {


  return (
    <div>
    </div>
  );
};

export default PagoComponent;
