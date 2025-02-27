import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Movimiento } from 'data/project-management/Recorrida';
import Button from 'components/base/Button';
import axios from 'axios';
import BsButton  from 'components/base/Button';
import  {ButtonVariant} from 'components/base/Button';




// const obj = JSON.parse(procesos);



const today = new Date().toISOString();



export const PendientesListTableColumns: ColumnDef<Movimiento>[] = [
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
    accessorKey: 'fecha',
    header: 'Fecha',
    cell: ({ row: { original } }) => {
      const { fechaDeRealizacion } = original;
      return (
        <p>  {fechaDeRealizacion.toString().split('T')[0]} </p>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion',
    cell: ({ row: { original } }) => {
      const { descripcion } = original;
      return (
        <p>{descripcion}</p>
        
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '30%' } }
    }
  }

];

const PendientesListTable = () => {
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

export default PendientesListTable;
