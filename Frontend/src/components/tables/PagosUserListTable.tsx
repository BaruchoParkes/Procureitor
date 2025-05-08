import { ColumnDef } from '@tanstack/react-table';
import AdvanceTable from 'components/base/AdvanceTable';
import { Link } from 'react-router-dom';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { Pago } from 'data/pagos/pago';
import Avatar from 'components/base/Avatar';
import { ProgressBar, Form } from 'react-bootstrap';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import Badge from 'components/base/Badge';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

export const pagosUserListTableColumns: ColumnDef<Pago>[] = [
  {
    accessorKey: 'pago',
    header: 'Pago',
    cell: ({ row: { original } }) => {
      const { pagoLabel } = original;
      const { pagoId } = original;

      return (
        <NavLink
          to={`/apps/pagos/pago-details/${pagoId}`}
          className="text-decoration-none fw-bold fs-8"
        >
          {pagoLabel}
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
      const { importe } = original;

      return <p className="text-decoration-none fw-bold fs-8">{importe}</p>;
    },
    meta: {
      cellProps: { className: 'white-space-nowrap py-4' },
      headerProps: { style: { width: '10%' } }
    }
  }
];

const PagosUserListTable = () => {
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

export default PagosUserListTable;
