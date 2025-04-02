import lightImg from 'assets/img/spot-illustrations/1.png';
import darkImg from 'assets/img/spot-illustrations/dark_1.png';
import { Link } from 'react-router-dom';
import Button from 'components/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const SignOutForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  return (
    <div className="text-center mb-6 mx-auto">
      <img className="mb-7 d-dark-none" src={lightImg} alt="phoenix" />
      <img className="mb-7 d-light-none" src={darkImg} alt="phoenix" />
      <div className="mb-6">
        <h4 className="text-body-highlight">Esperamos volverte a ver pronto!</h4>
        <p className="text-body-tertiary">
          Gracias por usar Procureitor. <br className="d-lg-none" />
          Estas deslogueado.
        </p>
      </div>
      <div className="d-grid">
        <Button
          variant="primary"
          as={Link}
          to={'/pages/authentication/simple/sign-in'}
          startIcon={<FontAwesomeIcon icon={faAngleLeft} className="me-2" />}
        >
         Volver a Loguearse
        </Button>
      </div>
    </div>
  );
};

export default SignOutForm;
