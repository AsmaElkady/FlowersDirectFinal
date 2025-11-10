import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import type { IModalProps } from "../../types/components/ModalProps";

const ModalComponent = ({
  show,
  handleClose,
  handleSave,
  title,
  body,
  showActions,
}: IModalProps) => {
  return (
    <Modal show={show} onHide={handleClose} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {showActions && (
        <Modal.Footer>
          <Button
            variant="secondary"
            className="text-white"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalComponent;
