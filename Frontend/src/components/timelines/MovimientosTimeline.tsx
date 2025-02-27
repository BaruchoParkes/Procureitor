import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Timeline from 'components/base/Timeline';
import { Movimiento } from 'data/project-management/Recorrida';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-dom'
import { format } from 'date-fns';

interface ActivityTimelineProps {
  data: Movimiento[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}; 



const MovimientosTimeline = ({ data }: ActivityTimelineProps) => {

  return (
    <Timeline variant="vertical">
      {data.map((item, index) => (
        <Timeline.Item className="position-relative" key={item.mtoId}>
          <Row className="g-md-3">
            <Col xs={12} md="auto" className="d-flex">
              <Timeline.OppositeContent>
                <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end">
                  {/* item.oppositeContent.date */}
                  <br className="d-none d-md-block" />{' '}
                  {/* item.oppositeContent.time */}
                </p>
              </Timeline.OppositeContent>
              <Timeline.Separator className="position-md-relative">
                <Timeline.Dot className="bg-primary-subtle">
                  {/*  <FontAwesomeIcon
/*                     icon={item.separator.icon}
                     className="text-primary-dark fs-10"
                  /> 
 */}                </Timeline.Dot>
                {index !== data.length - 1 && (
                  <Timeline.Bar className="h-100 border-dashed" />
                )}
              </Timeline.Separator>
            </Col>
            <Col>
            <NavLink to={ `/apps/project-management/movimiento/${item.mtoId}`}  >
                 
                <Timeline.Content>
                 <h5 className="fs-9 lh-sm">{item.descripcion}</h5>

                <p className="fs-9">
                  
                  {format(new Date(item.fechaDeRealizacion), 'dd/MM/yyyy hh:mm')}
                   
                </p>
                <p
                  className={classNames('fs-9 text-body-secondary', {
                    'mb-5': index !== data.length - 1,
                    'mb-0': index === data.length - 1
                  })}
                >
                </p>
              </Timeline.Content>
              </NavLink>
            </Col>
          </Row>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default MovimientosTimeline;
