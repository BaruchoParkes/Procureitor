import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProcesosTopSection from 'components/modules/project-management/ProcesosTopSection';
import PagosUserListTable, {pagosUserListTableColumns} from 'components/tables/PagosUserListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react'
import { useAuth } from 'providers/AuthProvider';

const PagosListView = () => {

  const [pagos, setpagos] = useState([])
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const fetchPagos = async () => {  

      try{
        const response = await axios.get(`/pagos/usuario/${user?.iniciales}`)
        const data = await response.data
        setpagos(data)
      }
      catch(error){
        console.error('ha habido un error: ', error)
      }
    };    
      fetchPagos()
    }, 
    );

    const table = useAdvanceTable({
      data: pagos,
      columns: pagosUserListTableColumns,
      pageSize: 2400,
      pagination: true,
      sortable: true
    });
  
  return (
    <div>
<AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Pagos</span>{' '}
            <span className="fw-normal text-body-tertiary">
            </span>
          </h2>
          <Link className="btn btn-primary px-5" to="/apps/pagos/createpagousuario">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Agregar Nuevo
          </Link>
        </div>
        <ProcesosTopSection activeView="list" />
        <PagosUserListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default PagosListView;
