import { Dropdown } from 'react-bootstrap';

const ActionDropdownItems = () => {
  return (
    <>
      <Dropdown.Item eventKey="1">Pendiente</Dropdown.Item>
      <Dropdown.Item eventKey="2">Cobrado</Dropdown.Item>
      <Dropdown.Item eventKey="2">Actor Moroso</Dropdown.Item>
      <Dropdown.Item eventKey="2">Cancelado</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4" className="text-danger">
        Remove
      </Dropdown.Item>
    </>
  );
};

export default ActionDropdownItems;
