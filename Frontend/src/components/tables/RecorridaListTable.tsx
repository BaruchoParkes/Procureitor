import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Movimiento } from 'data/project-management/Recorrida';
import Button from 'components/base/Button';
import axios from 'axios';
import BsButton from 'components/base/Button';
import { ButtonVariant } from 'components/base/Button';

const today = new Date().toISOString();

export const RecorridaListTableColumns: ColumnDef<Movimiento>[] = [
  {
    accessorKey: 'name',
    header: 'Autos',
    cell: ({ row: { original } }) => {
      const { Proc } = original;
      return (
        <Link to="#!" className="text-decoration-none fw-bold fs-8">
          {Proc.ACTO} c/ {Proc.DEMA}
        </Link>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row: { original } }) => {
      const handleUpdate = () => {
        axios
          .post('0/mtos/update2', { id: original.mtoId })
          .then(response => {
            console.log('Update successful:', response.data);
          })
          .catch(error => {
            console.error('Error updating:', error);
          });
      };

      return (
        <Button
          variant="primary"
          className="px-5 px-sm-15"
          onClick={handleUpdate}
        >
          Update
        </Button>
      );
    },
    meta: {
      cellProps: { className: 'ps-8 py-4' },
      headerProps: { style: { width: '10%' }, className: 'ps-8' }
    }
  }
];

const RecorridaListTable = () => {
  return (
    <div className="border-bottom border-translucent">
      <AdvanceTable
        tableProps={{
          className: 'phoenix-table border-top border-translucent fs-9'
        }}
      />
      <AdvanceTableFooter pagination className="py-3" />
    </div>
  );
};

export default RecorridaListTable;
