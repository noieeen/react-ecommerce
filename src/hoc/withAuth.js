import { userAuth } from "./../customHooks";
import { withRouter } from "react-router-dom";

const withAuth = (props) => userAuth(props) && props.children;

export default withRouter(withAuth);
