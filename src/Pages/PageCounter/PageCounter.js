import OrganismNavBar from "../../Organisms/OrganismsNavbar/OrganismNavbar";
import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { decrement, increment } from "../../Redux/actions";

class PageCounter extends React.Component {
  render() {
    return (
      <div>
        <OrganismNavBar />
        <Button onClick={()=> this.props.dispatch(decrement()) }>-</Button>
        <div className="m-2">
          <h1>Counter {this.props.redux.counter}</h1>
        </div>
        <Button onClick={()=> this.props.dispatch(increment()) }>+</Button>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redux: state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(PageCounter);
