import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import SearchBox from 'components/common/SearchBox';
import ToggleViewButton from 'components/common/ToggleViewbutton';
import FourGrid from 'components/icons/FourGrid';
import NineGrid from 'components/icons/NineGrid';
import { Project } from 'data/project-management/projects';
import { Proceso } from 'data/project-management/procesos';

import { useAdvanceTableContext } from 'providers/AdvanceTableProvider';
import { ChangeEvent, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { T } from '@fullcalendar/core/internal-common';

interface ProcesosTopSectionInterface {
  activeView: 'list' | 'board' | 'card';
}

const ProcesosTopSection = ({ activeView }: ProcesosTopSectionInterface) => {
  const navigate = useNavigate();
  const { setGlobalFilter, getPrePaginationRowModel, getColumn } =
    useAdvanceTableContext<Proceso>();

  const handleFilterItemClick = (columnId: string, value: string) => {
    const column = getColumn(columnId);
    console.log('Column:', column);
    column?.setFilterValue(value === '' ? '' : value);
    console.log('Filter set to:', value);
  };

  const tabItems: FilterTabItem[] = useMemo(() => {
    const getDataCount = (label: string) =>
      getPrePaginationRowModel().rows.filter(
        ({ original: { MIEM } }) => MIEM? MIEM === label : []
      ).length;

    return [
      {
        label: 'EA',
        value: 'EA',
        onClick: () => handleFilterItemClick('MIEM', 'EA'),
        count: getDataCount('EA')
      },
      {
        label: 'IS',
        value: 'IS',
        onClick: () => handleFilterItemClick('MIEM', 'IS'),
        count: getDataCount('IS')
      },
      {
        label: 'ISV',
        value: 'ISV',
        onClick: () => handleFilterItemClick('MIEM', 'ISV'),
        count: getDataCount('IS')
      },
      {
        label: 'LA',
        value: 'LA',
        onClick: () => handleFilterItemClick('MIEM', 'LA'),
        count: getDataCount('IS')
      },
      {
        label: 'MSJ',
        value: 'MSJ',
        onClick: () => handleFilterItemClick('MIEM', 'MSJ'),
        count: getDataCount('IS')
      },
      {
        label: 'ZCC',
        value: 'ZCC',
        onClick: () => handleFilterItemClick('MIEM', 'ZCC'),
        count: getDataCount('IS')
      },




    ];
  }, [getPrePaginationRowModel]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value || undefined);
  };

  return (
    <Row className="g-3 justify-content-between align-items-center mb-4">
      {/* <Col xs={12} sm="auto">
        <FilterTab tabItems={tabItems} />
      </Col>
 */}      <Col xs={12} sm="auto">
        <div className="d-flex align-items-center gap-1">
          <SearchBox
            onChange={handleSearchInputChange}
            placeholder="Buscar Procesos"
            style={{ maxWidth: '30rem' }}
            className="me-3"
          />
        </div>
      </Col>
    </Row>
  );
};
export default ProcesosTopSection;