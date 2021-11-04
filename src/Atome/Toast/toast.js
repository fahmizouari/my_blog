import React from "react";
import { Toast } from "react-bootstrap";

class CustomToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show,
      });
    }
  }
  render() {
    return (
      <div className="position-fixed top-0 end-0 p-3">
          <Toast
            onClose={() => {
              this.props.closeToast();
              this.setState({ show: false });
            }}
            show={this.state.show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{this.props.title}</strong>
              <small>0 mins ago</small>
            </Toast.Header>
            <Toast.Body className="text-start">{this.props.body}</Toast.Body>
          </Toast>
      </div>
    );
  }
}

export default CustomToast;
