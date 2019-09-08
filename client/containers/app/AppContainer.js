import React from 'react';
import { hot } from 'react-hot-loader';
// Import custom components
import MainRouter from '../../routers/routes';

const AppContainer = () => <MainRouter />;

export default hot(module)(AppContainer);
