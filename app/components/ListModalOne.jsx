import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ListModalOne(props) {
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
              <Modal.Title>Accept</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm Acceptance</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={(event) => {
                  handleVolunteerPop(props.value2);
                }}
                variant="primary"
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ListModalOne;