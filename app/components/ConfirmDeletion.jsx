import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmDelete(props) {
  const handleClose = () => {
    props.reverse({ onActive: false, holdID: -1 });
  };

  const handleVolunteerPop = (id) => {
    props.reverse({ onActive: true, holdId: id });
  };

  return (
    <>
      <Modal show={props.value} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirm Delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={(event) => {
              handleVolunteerPop(props.value2);
            }}
            variant="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;