import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProjectsTopSection from 'components/modules/project-management/ProjectsTopSection';
import RecorridaListTable, {
  RecorridaListTableColumns
} from 'components/tables/RecorridaListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import { Movimiento } from 'data/project-management/Recorrida';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PendientesListTable, {
  PendientesListTableColumns
} from 'components/tables/PendientesListTable';

//let mtos: Movimiento[] = [];

const PendientesListView = () => {
  const [mtos, setMtos] = useState([]);

  useEffect(() => {
    const fetchMtos = async () => {
      try {
        const response = await axios.get(`/mtos/pendientes`);
        const data = await response.data;
        setMtos(data);
      } catch (error) {
        console.error('ha habido un error: ', error);
      }
    };
    fetchMtos();
  });

  const table = useAdvanceTable({
    data: mtos,
    columns: PendientesListTableColumns,
    sortable: true
  });

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Pendientes</span>{' '}
            <span className="fw-normal text-body-tertiary">
              ({mtos.length})
            </span>{' '}
            <span className="me-3"> Hoy</span>{' '}
            <span className="fw-normal text-body-tertiary"></span>
          </h2>
          <Link className="btn btn-primary px-5" to="/">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Agregar Nuevo
          </Link>
        </div>
        <ProjectsTopSection activeView="list" />
        <PendientesListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default PendientesListView;
