import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Auth from '../modules/Auth';

const Navbar = (props) => {
  const LogoutFunction = () => {
    Auth.deauthenticateUser();
    props.history.replace('/');
  };

  const LogoutMenuItem = (
    <Menu.Item onClick={LogoutFunction}>Logout</Menu.Item>
  );

  const SwitchWhenUnauthenticated = (
    <Switch>
      <Route exact path="/login">
        <Menu.Item as={Link} to="/signup" className="ecell-primary">
          Sign Up
        </Menu.Item>
      </Route>

      <Route exact path="/signup">
        <Menu.Item as={Link} to="/login" className="ecell-primary">
          Log In
        </Menu.Item>
      </Route>
    </Switch>
  );

  return (
    <Menu attached size="huge" className="navbar">
      <Menu.Menu>
        <Menu.Item header as={Link} to="/" className="ecell-header">
          Internship Portal
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        {Auth.isUserAuthenticated() ? LogoutMenuItem : SwitchWhenUnauthenticated}
      </Menu.Menu>
    </Menu>
  );
};

Navbar.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Navbar);
