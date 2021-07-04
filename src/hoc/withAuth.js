import { userAuth } from "./../customHooks";
import { withRouter } from "react-router-dom";

const WithAuth = props => userAuth(props) && props.children;

export default withRouter(WithAuth);
