import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Proceso } from 'data/project-management/procesos';
import { useState, useEffect} from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import Button from 'components/base/Button';

export const procesosListTableColumns: ColumnDef<Proceso>[] = [
  {
    accessorKey: 'autos',
    header: 'Autos',
    cell: ({ row: { original } }) => {
      const { AUX8, PROC } = original;
      return (
        <NavLink
          to={`/apps/project-management/proceso-details/${PROC}`}
          className="text-decoration-none fw-bold fs-8"
          style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {AUX8}
        </NavLink>
      );
    },
    meta: {
      cellProps: { className: 'py-4' }, // Removed white-space: nowrap
      headerProps: { style: { width: '50%', maxWidth: '150px' } } // Added maxWidth
    }
  },  
  {
    accessorKey: 'MIEM',
    header: 'MIEM',
    cell: ({ row: { original } }) => {
      const { MIEM } = original;

      return (
        <p className="text-decoration-none fw-bold fs-8">
          { MIEM ?  MIEM : ''}
          </p>
      );
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '8%' } }
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
      headerProps: { style: { width: '8%' } }
    }
  },  
];

const ProcesosListTable = () => {
  return (
    <div className="border-bottom border-translucent">
      <AdvanceTable
        tableProps={{
          className: 'phoenix-table border-top border-translucent fs-9 table-responsive',
          style: { tableLayout: 'fixed', width: '100%' } // Enforce fixed layout

        }}
      />
      <AdvanceTableFooter pagination className="py-3" />
    </div>
  );
};

export default ProcesosListTable;
