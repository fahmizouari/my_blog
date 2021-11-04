import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import "./OrganismPost.css";
class Post extends React.Component {
  static defaultProps = {
    title: "title",
    body: "body",
  };
  render() {
    return (
      <Container fluid>
        <div className="m-5">
          <Row>
            <Col xs="9">
              <h2 className="box text-start fw-bold">{this.props.title}</h2>
            </Col>
            <Col xs="3" >
              <div className="d-flex justify-content-end" >
              <Button as={Col} variant="warning" className="ms-2" onClick={this.props.updateFN}>
                Update
              </Button>
              <Button as={Col} variant="danger" className="ms-2" onClick={this.props.deleteFN}>
                Delete
              </Button>
                </div>
              
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="box text-start">{this.props.body}</h4>
            </Col>
          </Row>
        </div>
      </Container >
    );
  }
}

export default Post;
