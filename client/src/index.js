import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalContextProvider from './context/context';
import {QueryClient, QueryClientProvider} from 'react-query';
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient()
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalContextProvider> 
        <QueryClientProvider client = {queryClient}>
          <App />
        </QueryClientProvider>
      </GlobalContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)