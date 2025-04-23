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
          className: 'phoenix-table border-top border-translucent fs-9'
        }}
      />
      <AdvanceTableFooter pagination className="py-3" />
    </div>
  );
};

export default ProcesosListTable;
