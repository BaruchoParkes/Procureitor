import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProcesosTopSection from 'components/modules/project-management/ProcesosTopSection';
import ProcesosListTable, {
  procesosListTableColumns
} from 'components/tables/ProcesosListTable';
import PagosListTable, {
  pagosListTableColumns
} from 'components/tables/PagosListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from 'providers/AuthProvider';

const PagosGeneralesListView = () => {
  const [pagos, setpagos] = useState([]);
  const { user, loading, logout } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000'; 


  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pagos/`);
        const data = await response.data;
        setpagos(data);
      } catch (error) {
        console.error('ha habido un error: ', error);
      }
    };
    fetchPagos();
  });

  const table = useAdvanceTable({
    data: pagos,
    columns: pagosListTableColumns,
    pageSize: 2400,
    pagination: true,
    sortable: true
  });

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Pagos Generales</span>{' '}
            <span className="fw-normal text-body-tertiary"></span>
          </h2>
          <Link className="btn btn-primary px-5" to="/apps/pagos/createpago">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Agregar Nuevo
          </Link>
        </div>
        <ProcesosTopSection activeView="list" />
        <PagosListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default PagosGeneralesListView;
