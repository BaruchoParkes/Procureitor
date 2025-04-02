import Avatar from 'components/base/Avatar';
import { useState } from 'react';
import { Card, Dropdown, Nav } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import Scrollbar from 'components/base/Scrollbar';
import classNames from 'classnames';
import defaultAvatar from 'assets/img/team/72x72/57.webp';
import { useAuth } from 'providers/AuthProvider';

interface ProfileDropdownMenuProps {
  className?: string;
}

const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({ className }) => {
  const { user, loading, logout } = useAuth();
  const [navItems] = useState([
    { label: 'Perfil', icon: 'user' },
    // Add more as needed
  ]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <Dropdown.Menu
      align="end"
      className={classNames(
        className,
        'navbar-top-dropdown-menu navbar-dropdown-caret py-0 dropdown-profile shadow border'
      )}
    >
      <Card className="position-relative border-0">
        <Card.Body className="p-0">
          <div className="d-flex flex-column align-items-center justify-content-center gap-2 pt-4 pb-3">
            <Avatar src={user?.avatar || defaultAvatar} size="xl" />
            <h6 className="text-body-emphasis">
              {user ? `${user.nombre}` : 'Not Logged In'}
            </h6>
          </div>
          <div style={{ height: '2rem' }}>
            <Scrollbar>
              <Nav className="nav flex-column mb-2 pb-1">
                {navItems.map(item => (
                  <Nav.Item key={item.label}>
                    <Nav.Link href="#!" className="px-3">
                      <FeatherIcon
                        icon={item.icon}
                        size={16}
                        className="me-2 text-body"
                      />
                      <span className="text-body-highlight">{item.label}</span>
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Scrollbar>
          </div>
        </Card.Body>
        <Card.Footer className="p-0 border-top border-translucent">
          <hr />
          <div className="px-3">
            <Link
              to="/pages/authentication/simple/sign-out"
              className="btn btn-phoenix-secondary d-flex flex-center w-100"
              onClick={logout}
            >
              <FeatherIcon icon="log-out" className="me-2" size={16} />
              Sign out
            </Link>
          </div>
          <div className="my-2 text-center fw-bold fs-10 text-body-quaternary">
            <Link className="text-body-quaternary me-1" to="#!">
              Privacy policy
            </Link>
            •
            <Link className="text-body-quaternary mx-1" to="#!">
              Terms
            </Link>
            •
            <Link className="text-body-quaternary ms-1" to="#!">
              Cookies
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </Dropdown.Menu>
  );
};

export default ProfileDropdownMenu;