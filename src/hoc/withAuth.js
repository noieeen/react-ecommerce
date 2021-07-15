import { userAuth } from "./../customHooks";

const WithAuth = props => userAuth(props) && props.children;

export default WithAuth;
