import React, { Fragment } from 'react';

// Import routing components
import { Route, Switch } from 'react-router-dom';

// Import custom components
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
import Home from '../containers/home';

const Router = () => (
  <Fragment>
    <Switch>
      {/* <Route exact path="/" component={Dashboard}/> */}
      {/* <Route path="/signup" component={SignUpForm}/> */}

      <MainLayout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </MainLayout>

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
