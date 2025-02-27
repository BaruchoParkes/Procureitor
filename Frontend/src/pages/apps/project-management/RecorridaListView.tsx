import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProjectsTopSection from 'components/modules/project-management/ProjectsTopSection';
import RecorridaListTable, {
  RecorridaListTableColumns
} from 'components/tables/RecorridaListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import {Movimiento } from 'data/project-management/Recorrida';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react'

//let mtos: Movimiento[] = [];


const RecorridaListView = () => {

  const [mtos, setMtos] = useState([]);

  useEffect(() => {
    const fetchMtos = async () => {  
      try{
        const response = await axios.get(`http://localhost:2000/mtos/mtosjson`)
        const data = await response.data
        setMtos(data)
      }
      catch(error){
        console.error('ha habido un error: ', error)
      }
    };    
    fetchMtos()
    }, [mtos]
  );
  
  
  const [counter, setCounter] = useState(0)

  const incrementCounter = () => {
    setCounter(counter + 1);
   }

 
  const table = useAdvanceTable({
    data: mtos,
    columns: RecorridaListTableColumns,
    pageSize: 40,
    pagination: true,
    sortable: true
  });

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Recorrida</span>{' '}
            <span className="fw-normal text-body-tertiary">
              ({mtos.length})
            </span>{' '}
            <span className="me-3">  Hoy</span>{' '}
            <span className="fw-normal text-body-tertiary">
              ({counter})
            </span>
          </h2>

        </div>
        <ProjectsTopSection activeView="list" />
        <RecorridaListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default RecorridaListView;