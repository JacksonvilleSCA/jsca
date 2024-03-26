import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormModalTwo(props) {
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
              <Modal.Title>Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm remove</Modal.Body>
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
                Remove
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default FormModalTwo;