import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProcesosTopSection from 'components/modules/project-management/ProcesosTopSection';
import CobrosListTable, {cobrosListTableColumns} from 'components/tables/CobrosListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react'
import { useAuth } from 'providers/AuthProvider';
import { Cobro, cobroInicial } from 'data/project-management/Cobro';



const CobrosListView = () => {

  const [cobros, setcobros] = useState([])
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const fetchCobros = async () => {  
      try{
        const response = await axios.get(`/cobros/pendientes/usuario/${user?.iniciales}`)
        const data = await response.data
        setcobros(data)
      }
      catch(error){
        console.error('ha habido un error: ', error)
      }
    };    
      fetchCobros()
    }, 
    );

    const table = useAdvanceTable({
      data: cobros,
      columns: cobrosListTableColumns,
      pageSize: 10,
      pagination: true,
      sortable: true
    });
  
  return (
    <div>
<AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <div className="me-3">Cobros Pendientes</div>{' '}
            <div className="fw-normal text-body-tertiary">
            </div>
          </h2>
          </div>
          <div>
          <h4 className="mb-0">
            <div className="me-5">Cargados por mí o que yo tengo que cobrar</div>{' '}
            <div className="fw-normal text-body-tertiary">
            </div>
          </h4>
          </div>
{/*         <ProcesosTopSection activeView="list" />
 */}        <CobrosListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default CobrosListView;
