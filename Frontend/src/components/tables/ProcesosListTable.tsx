import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Proceso } from 'data/project-management/procesos';
import Avatar from 'components/base/Avatar';
import { ProgressBar } from 'react-bootstrap';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import Badge from 'components/base/Badge';
import { useState, useEffect} from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import Button from 'components/base/Button';




export const procesosListTableColumns: ColumnDef<Proceso>[] = [
  {
    accessorKey: 'autos',
    header: 'Autos',
    cell: ({ row: { original } }) => {
      const { AUX8 } = original;
      const { PROC } = original;

      return (
        <NavLink to={`/apps/project-management/proceso-details/${PROC}`} 
        className="text-decoration-none fw-bold fs-8">
          {AUX8} 
        </NavLink>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },
  {
    accessorKey: 'expte',
    header: 'EXPTE',
    cell: ({ row: { original } }) => {
      const { EXP1 } = original;

      return (
        <p className="text-decoration-none fw-bold fs-8">
          {EXP1} 
          </p>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  },  
  {
    id: 'status',
    header: 'Status',
    cell: ({ row: { original } }) => {
      const { PROC } = original;

      const handleUpdate = () => {
        axios
          .post('0/procesos/update2', { PROC: PROC })
          .then((response) => {
            console.log('Update successful:', response.data);
          })
          .catch((error) => {
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

  },
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
    cell: () => (
      <RevealDropdownTrigger>
        <RevealDropdown>
          <ActionDropdownItems />
        </RevealDropdown>
      </RevealDropdownTrigger>
    ),
    meta: {
      headerProps: { style: { width: '10%' }, className: 'text-end' },
      cellProps: { className: 'text-end' }
    }
  }
];

const ProcesosListTable = () => {
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

export default ProcesosListTable;
