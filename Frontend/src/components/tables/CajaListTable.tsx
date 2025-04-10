import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { MovimientoDeCaja } from 'data/project-management/movimientoDeCaja';
import RevealDropdown, { RevealDropdownTrigger } from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';




// Define columns for MovimientoDeCaja
export const cajaListTableColumns: ColumnDef<MovimientoDeCaja>[] = [
  {
    accessorKey: 'id',
    header: 'Caja ID',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '5%' } }
    }
  },
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row: { original } }) =>
      original.created_at ? new Date(original.created_at).toLocaleDateString() : 'N/A',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '5%' } }
    }
  },
  {
    accessorKey: 'pagos_fk',
    header: 'Pago',
    cell: ({ row: { original } }) => (
      <NavLink
        to={`/apps/pagos/${original.pagos_fk}`}
        className="text-decoration-none fw-bold fs-8"
      >
        {original.pagos_fk}
      </NavLink>
    ),
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '5%' } }
    }
  },
  {
    accessorKey: 'cobros_fk',
    header: 'Cobro',
    cell: ({ row: { original } }) => (
      <NavLink
        to={`/apps/cobros/movimiento-details/${original.cobros_fk}`}
        className="text-decoration-none fw-bold fs-8"
      >
        {original.cobros_fk}
      </NavLink>
    ),
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '5%' } }
    }
  },
  {
    accessorKey: 'usuario',
    header: 'Usuario',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '5%' } }
    }
  },
  {
    accessorKey: 'movimiento',
    header: 'Movimiento ',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    accessorKey: 'Notas',
    header: 'Notas',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    accessorKey: 'Monto',
    header: 'Monto',
    cell: ({ row: { original } }) =>
      original.monto != null ? `$${original.monto.toLocaleString()}` : '$0',
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },
  {
    accessorKey: `Saldo`,
    header: 'Saldo',
    cell: ({ row: { original } }) =>


      original.saldo,

      
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  }
/*   {
    id: 'action',
    header: 'Acciones',
    cell: ({ row: { original } }) => (
      <RevealDropdownTrigger>
        <RevealDropdown>
          <ActionDropdownItems
          />
        </RevealDropdown>
      </RevealDropdownTrigger>
    ),
    meta: {
      headerProps: { style: { width: '15%' }, className: 'text-end' },
      cellProps: { className: 'text-end py-4' }
    }
  }
 */];

const CajaListTable = () => {
  const [cajaData, setCajaData] = useState<MovimientoDeCaja[]>([]);

  // Note: This fetch is redundant since CajaListView fetches the data.
  // Keeping it commented out unless you need local fetching here.
  /*
  useEffect(() => {
    const fetchCajaData = async () => {
      try {
        const response = await axios.get('/caja/list');
        setCajaData(response.data);
      } catch (error) {
        console.error('Error fetching caja data:', error);
      }
    };
    fetchCajaData();
  }, []);
  */

  return (
    <div className="border-bottom border-translucent">
      <AdvanceTable
/*         columns={cajaListTableColumns}
        data={cajaData}
 */        tableProps={{
          className: 'phoenix-table border-top border-translucent fs-9'
        }}
      />
      <AdvanceTableFooter pagination className="py-3" />
    </div>
  );
};

export default CajaListTable;