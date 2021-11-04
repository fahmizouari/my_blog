import React from "react";
import { Modal } from "react-bootstrap";

class CustomModel extends React.Component {
    render() {
        return (
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.props.modalShow}
            >
              <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                  {this.props.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.props.body}
              </Modal.Body>
            </Modal>
          );
    }
  }

  export default CustomModel;