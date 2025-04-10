import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Cobro, cobroInicial } from 'data/project-management/Cobro';
import Avatar from 'components/base/Avatar';
import { ProgressBar } from 'react-bootstrap';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import Badge from 'components/base/Badge';
import { useState, useEffect, useContext} from 'react'
import axios, { AxiosError } from 'axios';
import {NavLink} from 'react-router-dom'
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useAuth } from 'providers/AuthProvider';






export const cobrosListTableColumns: ColumnDef<Cobro>[] = [
  {
    accessorKey: 'created_at',
    header: 'Fecha',
    cell: ({ row: { original } }) => {
      const { created_at } = original;
      const dateObject = new Date(created_at);

      const formattedDate = dateObject.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      });
      

      return (
        <p className="text-decoration-none fw-bold fs-8">
           {
              formattedDate          
           }  
          </p>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },  
  {
    accessorKey: 'Cobro',
    header: 'cobro',
    cell: ({ row: { original } }) => {
      const { nombre } = original;
      const { mtos_fk } = original;



      return (
        <NavLink to={`/apps/project-management/movimiento/${mtos_fk}`} 
        className="text-decoration-none fw-bold fs-8">
          {nombre} 
        </NavLink>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },
  {
    accessorKey: 'importe',
    header: 'Importe',
    cell: ({ row: { original } }) => {
      const { monto } = original;

      return (
        <p className="text-decoration-none fw-bold fs-8">
          {monto} 
          </p>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },  
  {
    id: 'estado',
    header: 'Estado',
    cell: ({ row: { original } }) => {
      const [estado, setEstado] = useState(original.estado);
      const { cobro_id } = original;
      const { monto } = original;
      const { capital_honorarios } = original;
      const { notas } = original;
      const { nombre } = original;
      const { quien_cobra } = original;
      const { mtos_fk } = original;





      const { user, loading, logout } = useAuth();

      const handleEstadoChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newEstado = event.target.value;
        setEstado(newEstado);
        
        try {
          const usuario = user?.iniciales
          await axios.put(`/cobros/update/${cobro_id}`, {estado: newEstado, caja: quien_cobra, cobro_id, monto, usuario, capital_honorarios, notas, nombre, mtos_fk });

        } catch (error) {
          console.error('Error updating estado:', (error as AxiosError).response?.data || error);
        }
      };
  
      return (
        <Form.Select 
          size="lg" 
          onChange={handleEstadoChange}
          value={estado}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Cobrado">Cobrado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Actor Moroso">Actor Moroso</option>
        </Form.Select>
      );
    },
    meta: {
      cellProps: { className: 'ps-3 py-4' },
      headerProps: { style: { width: '10%' }, className: 'ps-3' }
    }
  }
  
  
  ,
  /*,
  {
    header: 'Start date',
    accessorKey: 'start',
    meta: {
      cellProps: { className: 'ps-3 fs-9 text-body white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' }, className: 'ps-3' }
    }
  },
  {
    header: 'Deadline',
    accessorKey: 'deadline',
    meta: {
      cellProps: { className: 'ps-3 fs-9 text-body white-space-nowrap py-4' },
      headerProps: { style: { width: '15%' }, className: 'ps-3' }
    }
  },
  {
    accessorKey: 'task',
    header: 'Task',
    meta: {
      cellProps: { className: 'ps-3 text-body py-4' },
      headerProps: { style: { width: '12%' }, className: 'ps-3' }
    }
  },
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row: { original } }) => {
      const { progress } = original;

      return (
        <>
          <p className="text-body-secondary fs-10 mb-0">
            {progress.min} / {progress.max}
          </p>
          <ProgressBar
            now={(progress.min / progress.max) * 100}
            style={{ height: 3 }}
            variant="success"
          />
        </>
      );
    },
    meta: {
      cellProps: { className: 'ps-3 py-4' },
      headerProps: { style: { width: '5%' }, className: 'ps-3' }
    }
  },
  {
    id: 'status',
    header: 'Status',
    accessorFn: ({ status }) => status.label,
    cell: ({ row: { original } }) => {
      const { status } = original;
      return (
        <Badge variant="phoenix" bg={status.type}>
          {status.label}
        </Badge>
      );
    },
    meta: {
      cellProps: { className: 'ps-8 py-4' },
      headerProps: { style: { width: '10%' }, className: 'ps-8' }
    }
   },*/
  {
    id: 'action',
    cell:  ({ row: { original } }) => {
        let { estado } = original;
        const { cobro_id } = original;


      <RevealDropdownTrigger>
        <RevealDropdown>
          <ActionDropdownItems />
        </RevealDropdown>
      </RevealDropdownTrigger>
    },
    meta: {
      headerProps: { style: { width: '10%' }, className: 'text-end' },
      cellProps: { className: 'text-end' }
    }
  }
];

const CobrosListTable = () => {
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

export default CobrosListTable;
