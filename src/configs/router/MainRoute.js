import React from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PublicRoute from "./module/PublicRoute";
import PrivateRoute from "./module/PrivateRoute";

import Login from '../../pages/auth/login'
import Register from '../../pages/auth/signup'
import ForgotPassword from '../../pages/auth/forgotPassword'
import ResetPassword from '../../pages/auth/resetPassword'
import Chat from '../../pages/main/chat'


function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/signup" component={Register} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PublicRoute path="/reset-password/:email/:token" component={ResetPassword} />
        <PrivateRoute exact path="/" component={Chat} />
      </Switch>
    </Router>
  );
}
export default App;
