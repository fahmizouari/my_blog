
import OrganismNavBar from "../../Organisms/OrganismsNavbar/OrganismNavbar";
import React from "react";
import { connect } from 'react-redux'

class PageListUser extends React.Component {

    render() { 
        return <div>
            <OrganismNavBar/>
            PageListUser
            <h1>Counter</h1>
            {this.props.redux.counter}
        </div>;
    }
}
 
const mapStateToProps = (state) => ({
    redux: state
});
export default connect(mapStateToProps, null)(PageListUser);