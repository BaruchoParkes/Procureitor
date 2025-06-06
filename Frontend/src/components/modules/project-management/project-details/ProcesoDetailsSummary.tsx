import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronRight,
  faEarthAmericas,
  faListCheck,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Proceso, procesoInicial } from 'data/project-management/procesos';

const ProcesoDetailsSummary = (data: Proceso) => {
  return (
    <>
      <div className="mb-4 mb-xl-7">
        <table className="lh-sm mb-4 mb-sm-0 mb-xl-4">
          <tbody>
            <tr>
              <td className="py-1" colSpan={2}>
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faEarthAmericas}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body">{data.OJUD}</h5>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Expte :</h5>
                </div>
              </td>
              <td className="ps-1 py-1">
                <Link className="fw-semibold d-block lh-sm" to="#!">
                  {data.EXP1}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Carpeta :</h5>
                </div>
              </td>
              <td className="ps-1 py-1">
                <Link className="fw-semibold d-block lh-sm" to="#!">
                  {data.CARP}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Responsable :</h5>
                </div>
              </td>
              <td className="ps-1 py-1">
                <Link className="fw-semibold d-block lh-sm" to="#!">
                  {data.MIEM}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Actor :</h5>
                </div>
              </td>
              <td className="ps-1 py-1">
                <Link className="fw-semibold d-block lh-sm" to="#!">
                  {data.ACTO}
                </Link>
              </td>
            </tr>
            <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Dddo :</h5>
                </div>
              </td>
              <td className="ps-1 py-1">
                <Link className="fw-semibold d-block lh-sm" to="#!">
                  {data.DEMA}
                </Link>
              </td>
            </tr>
            {/*         <tr>
              <td className="align-top py-1">
                <div className="d-flex">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="me-2 text-body-tertiary fs-9"
                  />
                  <h5 className="text-body mb-0 text-nowrap">Budget : </h5>
                </div>
              </td>
              <td className="fw-bold ps-1 py-1 text-body-highlight">$8,742</td>
            </tr>
 */}{' '}
          </tbody>
        </table>
        <table className="lh-sm">
          <tbody>
            <tr>
              <td className="align-top py-1 text-body text-nowrap fw-bold">
                Fecha :{' '}
              </td>
              <td className="text-body-tertiary text-opacity-85 fw-semibold ps-3">
                {data.INIC}
              </td>
            </tr>
            {/*             <tr>
              <td className="align-top py-1 text-body text-nowrap fw-bold">
                Deadline :
              </td>
              <td className="text-body-tertiary text-opacity-85 fw-semibold ps-3">
                21st May, 2028
              </td>
            </tr>
            <tr>
              <td className="align-top py-1 text-body text-nowrap fw-bold">
                Progress :
              </td>
              <td className="text-warning fw-semibold ps-3">80%</td>
            </tr>*/}
          </tbody>
        </table>
      </div>
      {/*       <div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faListCheck}
            className="me-2 text-body-tertiary fs-9"
          />
          <h5 className="text-body-emphasis mb-0 me-2">
            91<span className="text-body fw-normal ms-2">tasks</span>
          </h5>
          <Link className="fw-bold fs-9 mt-1" to="#!">
            See tasks{' '}
            <FontAwesomeIcon icon={faChevronRight} className="me-2 fs-10" />
          </Link>
        </div>
      </div>  */}
    </>
  );
};

export default ProcesoDetailsSummary;
