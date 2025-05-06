import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import ProcesosTopSection from 'components/modules/project-management/ProcesosTopSection';
import ProcesosListTable, {
  procesosListTableColumns
} from 'components/tables/ProcesosListTable';
import { defaultBreadcrumbItems } from 'data/commonData';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect} from 'react'

const ProjectListView = () => {

  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
  const fetchProcesos = async () => {  
    try{
      const response = await axios.get(`/procesos/procesosajson`)
      const data = await response.data
      setProcesos(data)
    }
    catch(error){
      console.error('ha habido un error: ', error)
    }
  };    
    fetchProcesos()
  }, 
  );

  const table = useAdvanceTable({
    data: procesos,
    columns: procesosListTableColumns,
    pageSize: 2400,
    pagination: true,
    sortable: true
  });

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Procesos</span>{' '}
          </h2>
        </div>
        <ProcesosTopSection activeView="list" />
        <div
          className="table-responsive"
          style={{ overflowX: 'auto', width: '100%' }}
        >
          <ProcesosListTable />
        </div>
      </AdvanceTableProvider>
    </div>
  );
};

export default ProjectListView;
