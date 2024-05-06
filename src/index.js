import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import { logger } from 'redux-logger';

import App from './App';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { REACT_APP_TEMPLATE_CLIENT_ID, network } from './store/config';


import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect, embeddedWallet, trustWallet, en } from '@thirdweb-dev/react';


const root = ReactDOM.createRoot(document.getElementById("root"));
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));


const AppWithWalletConnect = () => (
  <ThirdwebProvider
    locale={en()}
    activeChain={network}
    clientId={REACT_APP_TEMPLATE_CLIENT_ID}
    supportedWallets={[
      trustWallet(),
      walletConnect(),
      coinbaseWallet(),
      metamaskWallet({ recommended: true }),
      embeddedWallet({ auth: { options: ["email", "google"] } }),
    ]}
  >
    <App />
  </ThirdwebProvider>
);


root.render(
  <Provider store={store}>
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          {/* <App /> */}
          <AppWithWalletConnect />

        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  </Provider>
);
