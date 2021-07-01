import { userEffect } from "react";
import { userSelector } from "react-redux";

const mapState = ({ user }) => ({ currentUser: user.currentUser });

const userAuth = (props) => {
  const { currentUser } = userSelector(mapState);

  userEffect(() => {
    if (!currentUser) {
      props.history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default userAuth;
