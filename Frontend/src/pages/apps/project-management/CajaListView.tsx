import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CajaListTable, { cajaListTableColumns } from 'components/tables/CajaListTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { MovimientoDeCaja } from 'data/project-management/movimientoDeCaja';
import { Link } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';


const CajaListView = () => {
  const [caja, setCaja] = useState<MovimientoDeCaja[]>([]);
  const { user, loading, logout } = useAuth();

  useEffect(() => {

    let fetchCaja =  async () => {

        try {
          const response = await axios.get(`/caja/${user?.iniciales}`);
          console.log('Fetched caja data:', response.data); // Debug log
          setCaja(response.data);
        } catch (error) {
          console.error('Ha habido un error:', error);
        }
      }

    fetchCaja();
  }, []);

  const table = useAdvanceTable({
    data: caja,
    columns: cajaListTableColumns,
    pageSize: 10,
    pagination: true,
    sortable: true
  });

  console.log(caja)

  return (
    <div>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Caja {user?.iniciales}</span>
          </h2>
        </div>
        <CajaListTable />
      </AdvanceTableProvider>
    </div>
  );
};

export default CajaListView;