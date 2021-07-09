import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./default.scss";
import { useDispatch, useSelector } from "react-redux";

import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/Users/user.actions";

//Hoc
import WithAuth from "./hoc/withAuth";

//Layout
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//Components

//Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

const App = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {

  //   return () => {
  //     authListener();
  //   };
  // }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>(
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>(
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
